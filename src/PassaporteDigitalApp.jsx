// PassaporteDigitalApp.jsx
import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const postos = [
  {
    id: "posto01",
    nome: "Diogolândia",
    local: "Pavilhão 1",
    descricao: "Embarca numa viagem mágica pelo reino da criatividade! Poderás explorar uma exposição cheia de cor, imaginação e talento dos pequenos grandes exploradores desde a Pré até ao 1.º Ciclo. Cada paragem é uma surpresa — desde castelos de papel até mares de ideias! Vem descobrir onde a imaginação dos nossos alunos ganha vida!"
  },
  {
    id: "posto02",
    nome: "Escola Fixa de Trânsito",
    local: "Campo junto ao Pavilhão 1",
    descricao: "Transforma-te num verdadeiro explorador da estrada! Onde as regras de segurança ganham vida entre curvas divertidas, sinais misteriosos e cruzamentos cheios de ação! Prepara-te para acelerar o conhecimento e travar só para aprender — sempre com segurança e um sorriso na cara!"
  },
  {
    id: "posto03",
    nome: "Palco das Maravilhas",
    local: "Campo com coberto",
    descricao: "O coração da festa do Dia Diogo Cão, com apresentações únicas e cheias de talento: dança, teatro e performances criativas que prometem encantar e surpreender!"
  },
  {
    id: "posto04",
    nome: "Receção",
    local: "Entrada da escola",
    descricao: "Bem-vindos ao ponto de partida da nossa viagem fantástica! Aqui, recebes informações e levantas a tua senha de almoço para repor energias durante o dia."
  },
  {
    id: "posto05",
    nome: "Zona Lazer Run & Circuito Ativo",
    local: "Campo 1",
    descricao: "Testa a tua pontaria com desafios de mira e diverte-te com jogos que põem à prova o teu equilíbrio, agilidade e energia!"
  },
  {
    id: "posto06",
    nome: "APEAEEDC - Insufláveis",
    local: "Campo 2",
    descricao: "Espaço saltitante e cheio de energia garantido pela Associação de Pais! Gargalhadas e diversão para todos!"
  },
  {
    id: "posto07",
    nome: "Ciência Viva",
    local: "CN4",
    descricao: "Explora a Físico-Química com reações, forças e energia à solta! Uma aventura científica para mentes curiosas."
  },
  {
    id: "posto08",
    nome: "Tec & Futuro",
    local: "Sala XXI",
    descricao: "Atividades tecnológicas desde robótica, impressão 3D e ideias criativas sobre o futuro!"
  },
  {
    id: "posto09",
    nome: "Educação Visual & Ateliers",
    local: "ET3, EV3 e Sala 12",
    descricao: "Espaço para desenhar, pintar, construir e dar asas à tua imaginação com materiais artísticos."
  },
  {
    id: "posto10",
    nome: "Espaço das Línguas",
    local: "Sala 11",
    descricao: "Descobre culturas, línguas, expressões criativas e diverte-te com jogos linguísticos!"
  }
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
