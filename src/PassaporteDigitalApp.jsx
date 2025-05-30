// PassaporteDigitalApp.jsx
import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const postos = [
  { id: "posto01", nome: "Diogolândia", local: "Pavilhão 1", descricao: "Embarca numa viagem mágica pelo reino da criatividade! Poderás explorar uma exposição cheia de cor, imaginação e talento dos pequenos grandes exploradores desde a Pré até ao 1.º Ciclo. Cada paragem é uma surpresa — desde castelos de papel até mares de ideias! Vem descobrir onde a imaginação dos nossos alunos ganha vida!" },
  { id: "posto02", nome: "Escola Fixa de Trânsito – Exploradores sobre Rodas", local: "Campo junto ao Pavilhão1", descricao: "Transforma-te num verdadeiro explorador da estrada! Onde as regras de segurança ganham vida entre curvas divertidas, sinais misteriosos e cruzamentos cheios de ação! Prepara-te para acelerar o conhecimento e travar só para aprender — sempre com SEGURANÇA e um sorriso na cara!" },
  { id: "posto03", nome: "Palco das Maravilhas", local: "Campo com coberto", descricao: "O coração da festa do Dia Diogo Cão, com apresentações únicas e cheias de talento: dança, teatro e performances criativas que prometem encantar e surpreender!" },
  { id: "posto04", nome: "Receção", local: "Entrada da escola", descricao: "Bem-vindos ao ponto de partida da nossa viagem fantástica pelo Dia Diogo Cão! Aqui, começa a tua jornada — é onde recebes todas as informações importantes e, claro, levantas a tua senha de almoço para repor energias durante o dia." },
  { id: "posto05", nome: "Zona Lazer Run & Circuito Ativo", local: "Campo 1", descricao: "Testa a tua pontaria e concentração no Lazer Run e diverte-te com o Circuito Ativo! Uma combinação imbatível de precisão, equilíbrio e energia!" },
  { id: "posto06", nome: "APEAEDC – Associação de Pais", local: "Campo 2", descricao: "Com os insufláveis trazidos pela APEAEEDC, os sorrisos saltam mais alto e a energia nunca acaba. Diversão garantida!" },
  { id: "posto07", nome: "Ciência Viva", local: "CN4", descricao: "Explora fenómenos fascinantes com experiências de Físico-Química — reações, forças e energia à solta!" },
  { id: "posto08", nome: "Tec & Futuro", local: "Sala XXI", descricao: "Explora robótica, impressão 3D e descobertas digitais. O futuro começa hoje, nas tuas mãos!" },
  { id: "posto09", nome: "Educação Visual & Ateliers", local: "ET3, EV3 e Sala12", descricao: "Pinta, desenha, constrói — dá asas à tua imaginação nas Expressões Artísticas e ateliers!" },
  { id: "posto10", nome: "Espaço das Línguas", local: "Sala 11", descricao: "Descobre curiosidades, jogos e a Feira do Livro Usado em Português, Inglês, Francês e PLNM." },
  { id: "posto11", nome: "Matemática – 2.º Ciclo", local: "Sala 10", descricao: "Desafios matemáticos com lógica, jogos e criatividade para o 2.º ciclo. Contar nunca foi tão divertido!" },
  { id: "posto12", nome: "Matemática – 3.º Ciclo", local: "Tenda à frente CN3", descricao: "Jogos, enigmas e lógica para elevar o teu raciocínio matemático a outro nível." },
  { id: "posto13", nome: "Ciências", local: "CN3", descricao: "Explora o corpo humano, ecossistemas, energia e mais. Aprende experimentando!" },
  { id: "posto14", nome: "Posto Erasmus", local: "Sala13", descricao: "Descobre culturas, experiências e oportunidades do projeto Erasmus+. Europa na nossa escola!" },
  { id: "posto15", nome: "Fico na Escola", local: "CN2", descricao: "Feira com trabalhos dos alunos, crepes deliciosos e atelier de croché. Uma comunidade cheia de talento!" },
  { id: "posto16", nome: "Religião e Moral", local: "Sala 7", descricao: "Reflexão, criatividade e valores para construir um mundo melhor com empatia e solidariedade." },
  { id: "posto17", nome: "Cidadania", local: "Sala 8", descricao: "Projetos e exposições sobre direitos, inclusão, sustentabilidade e participação cívica." },
  { id: "posto18", nome: "Ciências Sociais e Humanas", local: "Sala 9", descricao: "História, geografia e cultura em exposições e atividades criativas para compreender o mundo." },
  { id: "posto19", nome: "Centro de Apoio à Aprendizagem", local: "Sala 5", descricao: "Jogos sensoriais, tecnologias de apoio e teatro sensorial. Um espaço inclusivo e estimulante." },
  { id: "posto20", nome: "Diogo Cão Space Center", local: "Recreio Pavilhão 2", descricao: "Às 15h15, assiste ao lançamento de foguetes de água! Ciência e criatividade em órbita!" },
  { id: "posto21", nome: "Avenida da Alimentação", local: "Coberto e Barraquinhas", descricao: "Snacks, fruta, bebidas e tudo para recuperar energias com sabor!" },
  { id: "posto22", nome: "Biblioteca", local: "Biblioteca", descricao: "Lê, ouve histórias e deixa-te levar pela magia dos livros. Surpresas literárias incluídas!" },
  { id: "posto23", nome: "Refeitório", local: "Refeitório", descricao: "Almoços equilibrados, convívio e energia à mesa. Reforça forças para o resto do dia!" },
  { id: "posto24", nome: "Palco Harmonia - Sottovoce", local: "Polivalente", descricao: "Docentes e não docentes celebram o Dia Diogo Cão com música e união!" }
];

function App() {
  const [nome, setNome] = useState("");
  const [visitados, setVisitados] = useState([]);
  const [paginaInicial, setPaginaInicial] = useState(true);

  useEffect(() => {
    if (!nome) return;
    const element = document.getElementById("reader");
    if (!element) return;

    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250
    });

    scanner.render(
      (decodedText) => {
        if (!visitados.includes(decodedText) && postos.find(p => p.id === decodedText)) {
          setVisitados(prev => [...prev, decodedText]);
        }
      },
      (error) => console.warn(error)
    );

    return () => scanner.clear().catch(err => console.error(err));
  }, [nome]);

  const postosCompletos = visitados.length;
  const totalPostos = postos.length;

  if (paginaInicial) {
    return (
      <div style={{ padding: 20, fontFamily: 'sans-serif', textAlign: 'center' }}>
        <h1>🎉 Bem-vindo ao Dia Diogo Cão! 🎉</h1>
        <p>Prepara-te para um dia mágico e inesquecível repleto de criatividade, ciência, arte e diversão!</p>
        <p>Explora todos os postos e carimba o teu passaporte digital. No final, há uma recompensa à tua espera! 🎁</p>
        <button onClick={() => setPaginaInicial(false)} style={{ marginTop: 20, padding: "10px 20px", fontSize: 16 }}>
          Começar Exploração 🚀
        </button>
      </div>
    );
  }

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

          <div id="reader" style={{ width: "100%", maxWidth: 400, margin: "20px auto" }}></div>

          <h3>📍 Postos Visitados:</h3>
          <ul>
            {visitados.map(id => {
              const posto = postos.find(p => p.id === id);
              return (
                <li key={id}>
                  <strong>{posto.nome}</strong><br />
                  <em>{posto.local}</em><br />
                  <p>{posto.descricao}</p>
                </li>
              );
            })}
            {visitados.length === 0 && <li>Ainda não visitaste nenhum posto.</li>}
          </ul>

          <h3 style={{ marginTop: 40 }}>🗺️ Todos os Postos Disponíveis:</h3>
          <ul>
            {postos.map(p => (
              <li key={p.id}>
                <strong>{p.nome}</strong><br />
                <em>{p.local}</em><br />
                <p>{p.descricao}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
