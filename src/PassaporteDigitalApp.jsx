// Código JSX da app colorida com estilo atualizado
import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const postos = [...Array(24)].map((_, i) => ({
  id: `posto${i + 1}`,
  nome: `Posto ${i + 1}`
}));

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
      (error) => console.warn(error)
    );
  };

  const marcarPosto = (postoId) => {
    if (!postos.find((p) => p.id === postoId)) return alert("Código QR inválido!");
    if (progresso.visitados.includes(postoId)) return alert("Posto já visitado!");
    const novoProgresso = { ...progresso, visitados: [...progresso.visitados, postoId] };
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
      <div className="container">
        <h1>Dia Diogo Cão</h1>
        <h2>Passaporte Digital</h2>
        <input
          className="input"
          placeholder="Nome do Jogador"
          value={nomeJogador}
          onChange={(e) => setNomeJogador(e.target.value)}
        />
        <button onClick={handleLogin}>Entrar</button>
      </div>
    );
  }

  const todosVisitados = progresso.visitados.length === postos.length;

  return (
    <div className="container">
      <h1>Dia Diogo Cão</h1>
      <h2>Olá, {progresso.jogador}!</h2>
      <p>Visitaste {progresso.visitados.length} de {postos.length} postos</p>
      {todosVisitados && <div className="congrats">🎉 Completaste o passaporte!</div>}
      <div id="scanner" />
      <button onClick={iniciarScanner}>📷 Ler Código QR</button>
      <div className="grid">
        {postos.map((posto) => (
          <div key={posto.id} className={`posto ${progresso.visitados.includes(posto.id) ? "visitado" : ""}`}>
            {posto.nome}
          </div>
        ))}
      </div>
    </div>
  );
}
