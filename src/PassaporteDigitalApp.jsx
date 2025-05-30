// PassaporteDigitalApp.jsx
import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const postos = [
  { id: "posto01", nome: "Diogolândia", local: "Pavilhão 1", descricao: "Embarca numa viagem mágica pelo reino da criatividade! Poderás explorar uma exposição cheia de cor, imaginação e talento dos pequenos grandes exploradores desde a Pré até ao 1.º Ciclo. Cada paragem é uma surpresa — desde castelos de papel até mares de ideias! Vem descobrir onde a imaginação dos nossos alunos ganha vida!" },
  { id: "posto02", nome: "Escola Fixa de Trânsito – Exploradores sobre Rodas", local: "Campo junto ao Pavilhão1", descricao: "Transforma-te num verdadeiro explorador da estrada! Onde as regras de segurança ganham vida entre curvas divertidas, sinais misteriosos e cruzamentos cheios de ação! Prepara-te para acelerar o conhecimento e travar só para aprender — sempre com SEGURANÇA e um sorriso na cara!" },
  { id: "posto03", nome: "Palco das Maravilhas", local: "Campo com coberto", descricao: "O coração da festa do Dia Diogo Cão, com apresentações únicas e cheias de talento: dança, teatro e performances criativas que prometem encantar e surpreender!" },
  // ... (restante lista permanece igual)
  { id: "posto24", nome: "Palco Harmonia - Sottovoce", local: "Polivalente", descricao: "Docentes e não docentes celebram o Dia Diogo Cão com música e união!" }
];

function App() {
  const [nome, setNome] = useState("");
  const [visitados, setVisitados] = useState([]);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250
    });

    scanner.render(
      (decodedText) => {
        if (!visitados.includes(decodedText) && postos.find(p => p.id === decodedText)) {
          setVisitados([...visitados, decodedText]);
        }
      },
      (error) => console.warn(error)
    );

    return () => scanner.clear().catch(err => console.error(err));
  }, [visitados]);

  const postosCompletos = visitados.length;
  const totalPostos = postos.length;

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      {!nome ? (
        <div>
          <h2>Bem-vindo!</h2>
          <input
            type="text"
            placeholder="Introduz o teu nome"
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
      ) : (
        <div>
          <h2>Olá, {nome}!</h2>
          <p>Visitaste {postosCompletos} de {totalPostos} postos.</p>
          {postosCompletos === totalPostos && (
            <p>🎉 Parabéns! Completaste o passaporte! Vai ao posto de controlo levantar o teu prémio.</p>
          )}
        </div>
      )}

      <div id="reader" style={{ width: "100%", maxWidth: 400, margin: "20px auto" }}></div>

      <h3>Postos Visitados:</h3>
      <ul>
        {visitados.map(id => {
          const posto = postos.find(p => p.id === id);
          return (
            <li key={id}>
              <strong>{posto.nome}</strong><br/>
              <em>{posto.local}</em><br/>
              <p>{posto.descricao}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
