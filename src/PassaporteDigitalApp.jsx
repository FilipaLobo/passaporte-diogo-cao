// PassaporteDigitalApp.jsx
import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const postos = [
  // ... (lista de postos como atualizada anteriormente com descricao incluída)
];

const loadProgress = () => {
  const data = localStorage.getItem("passaporte-progress");
  return data ? JSON.parse(data) : { jogador: "", visitados: [] };
};

const saveProgress = (progress) => {
  localStorage.setItem("passaporte-progress", JSON.stringify(progress));
};

export default function PassaporteDigitalApp() {
  const [progresso, setProgresso] = useState(loadProgress());
  const [nomeJogador, setNomeJogador] = useState(progresso.jogador || "");
  const [scanAtivo, setScanAtivo] = useState(false);
  const [expandido, setExpandido] = useState(null);

  const iniciarScanner = () => {
    if (scanAtivo) return;
    setScanAtivo(true);
    const scanner = new Html5QrcodeScanner("scanner", { fps: 10, qrbox: 250 });
    scanner.render(
      (decodedText) => {
        scanner.clear();
        setScanAtivo(false);
        marcarPosto(decodedText);
      },
      (error) => {
        console.warn(error);
      }
    );
  };

  const marcarPosto = (postoId) => {
    if (!postos.find((p) => p.id === postoId)) return alert("Código QR inválido!");
    if (progresso.visitados.includes(postoId)) return alert("Posto já visitado!");
    const novoProgresso = {
      ...progresso,
      visitados: [...progresso.visitados, postoId]
    };
    setProgresso(novoProgresso);
    saveProgress(novoProgresso);
  };

  const handleLogin = () => {
    const novoProgresso = { ...progresso, jogador: nomeJogador };
    setProgresso(novoProgresso);
    saveProgress(novoProgresso);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const postoId = params.get("posto");
    if (postoId) marcarPosto(postoId);
  }, []);

  if (!progresso.jogador) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <div className="border rounded-xl p-4 shadow">
          <h1 className="text-xl font-bold mb-4">Bem-vindo ao Passaporte Digital!</h1>
          <input
            className="w-full p-2 border rounded"
            placeholder="Insere o teu nome de jogador"
            value={nomeJogador}
            onChange={(e) => setNomeJogador(e.target.value)}
          />
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={handleLogin}>Entrar</button>
        </div>
      </div>
    );
  }

  const todosVisitados = progresso.visitados.length === postos.length;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Olá, {progresso.jogador}!</h2>
      <p className="mb-4">Visitaste {progresso.visitados.length} de {postos.length} postos.</p>

      {todosVisitados && (
        <div className="mb-4 p-4 bg-green-100 rounded-xl shadow">🎉 Parabéns! Completaste o passaporte! Vai ao posto de controlo levantar o teu prémio.</div>
      )}

      <div className="mb-4">
        <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={iniciarScanner}>📷 Ler QR Code</button>
      </div>

      <div id="scanner" className="mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {postos.map((posto) => (
          <div key={posto.id} className={`border p-4 rounded shadow ${progresso.visitados.includes(posto.id) ? "bg-green-50" : ""}`}>
            <h3 className="font-bold text-lg cursor-pointer" onClick={() => setExpandido(expandido === posto.id ? null : posto.id)}>{posto.nome}</h3>
            <p className="text-sm">Local: {posto.local}</p>
            <p className="text-xs mt-2">{progresso.visitados.includes(posto.id) ? "✅ Visitado" : "⏳ Por visitar"}</p>
            {expandido === posto.id && (
              <p className="mt-2 text-sm text-gray-700">{posto.descricao}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
