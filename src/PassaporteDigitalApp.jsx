import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const postos = [
  { id: "posto01", nome: "Diogolândia", local: "Pavilhão 1", descricao: "Embarca numa viagem mágica pelo reino da criatividade! Poderás explorar uma exposição cheia de cor, imaginação e talento dos pequenos grandes exploradores desde a Pré até ao 1.º Ciclo. Cada paragem é uma surpresa — desde castelos de papel até mares de ideias! Vem descobrir onde a imaginação dos nossos alunos ganha vida!" },
  { id: "posto02", nome: "Escola Fixa de Trânsito – Exploradores sobre Rodas", local: "Campo junto ao Pavilhão1", descricao: "Transforma-te num verdadeiro explorador da estrada! Onde as regras de segurança ganham vida entre curvas divertidas, sinais misteriosos e cruzamentos cheios de ação! Prepara-te para acelerar o conhecimento e travar só para aprender — sempre com SEGURANÇA e um sorriso na cara!" },
  { id: "posto03", nome: "Palco das Maravilhas", local: "Campo com coberto", descricao: "O coração da festa do Dia Diogo Cão, com apresentações únicas e cheias de talento: dança, teatro e performances criativas que prometem encantar e surpreender!" },
  { id: "posto04", nome: "Receção", local: "Entrada da escola", descricao: "Bem-vindos ao ponto de partida da nossa viagem fantástica! Aqui, recebes informações e levantas a tua senha de almoço para repor energias durante o dia." },
  { id: "posto05", nome: "Zona Lazer Run & Circuito Ativo", local: "Campo 1", descricao: "Testa a tua pontaria com desafios de mira e diverte-te com jogos que põem à prova o teu equilíbrio, agilidade e energia!" },
  { id: "posto06", nome: "APEAEEDC – Insufláveis", local: "Campo 2", descricao: "Espaço saltitante e cheio de energia garantido pela Associação de Pais! Gargalhadas e diversão para todos!" },
  { id: "posto07", nome: "Ciência Viva", local: "CN4", descricao: "Explora a Físico-Química com reações, forças e energia à solta! Uma aventura científica para mentes curiosas." },
  { id: "posto08", nome: "Tec & Futuro", local: "Sala XXI", descricao: "Atividades tecnológicas desde robótica, impressão 3D e ideias criativas sobre o futuro!" },
  { id: "posto09", nome: "Educação Visual & Ateliers", local: "ET3, EV3 e Sala 12", descricao: "Desenhar, pintar, construir e dar asas à imaginação com atividades artísticas em ambiente cheio de inspiração!" },
  { id: "posto10", nome: "Espaço das Línguas", local: "Sala 11", descricao: "Exposições criativas em várias línguas e a Feira do Livro Usado. Jogos interativos e aprendizagem divertida!" },
  { id: "posto11", nome: "Matemática – 2.º Ciclo", local: "Sala 10", descricao: "Desafios com lógica, enigmas e jogos para resolver com criatividade e raciocínio!" },
  { id: "posto12", nome: "Matemática – 3.º Ciclo", local: "Tenda à frente CN3", descricao: "Problemas intrigantes, jogos matemáticos e lógica prática e divertida!" },
  { id: "posto13", nome: "Ciências", local: "CN3", descricao: "Experiências, exploração da natureza e descobertas sobre o corpo humano, energia e ecossistemas!" },
  { id: "posto14", nome: "Posto Erasmus", local: "Sala 13", descricao: "Descobre culturas e oportunidades do Projeto Erasmus+ com exposições e atividades interativas." },
  { id: "posto15", nome: "Fico na Escola", local: "CN2", descricao: "Feira com produtos dos alunos, crepes deliciosos e um encantador atelier de croché." },
  { id: "posto16", nome: "Religião e Moral", local: "Sala 7", descricao: "Partilha de valores, empatia e dinâmicas criativas para construir um mundo melhor." },
  { id: "posto17", nome: "Cidadania", local: "Sala 8", descricao: "Projetos de direitos humanos, inclusão e participação ativa para mudar o mundo!" },
  { id: "posto18", nome: "Ciências Sociais e Humanas", local: "Sala 9", descricao: "História, geografia, culturas e consciência crítica ganham vida com exposições e atividades!" },
  { id: "posto19", nome: "Centro de Apoio à Aprendizagem", local: "Sala 5", descricao: "Sala Snoezelen, Teatro Sensorial e experiências inclusivas de aprendizagem com os sentidos!" },
  { id: "posto20", nome: "Diogo Cão Space Center", local: "Recreio Pavilhão 2", descricao: "Lançamento de foguetes de água, experiências e muita ciência rumo ao espaço!" },
  { id: "posto21", nome: "Avenida da Alimentação", local: "Coberto e Barraquinhas", descricao: "Snacks, frutas, bebidas e sabores deliciosos para recarregar energias!" },
  { id: "posto22", nome: "Biblioteca", local: "Biblioteca", descricao: "Leituras partilhadas, contos animados e viagens literárias sem sair do lugar!" },
  { id: "posto23", nome: "Refeitório", local: "Refeitório", descricao: "Refeições equilibradas, convívio e energia para aproveitar o dia!" },
  { id: "posto24", nome: "Palco Harmonia - Sottovoce", local: "Polivalente", descricao: "Docentes e não docentes celebram o Dia Diogo Cão com música e união!" }
];

function App() {
  return <div>Passaporte Digital App</div>;
}

export default App;
