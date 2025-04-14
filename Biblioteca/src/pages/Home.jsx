import React from 'react';
import './Home.css';
import biblioteca from '../img/biblioteca.png';

const Home = () => {
  const livros = [
    {
      id: 1,
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2CREGeVdF4oG6Ha_VHjG-jmIcsV499bEW1nXj5b-ixww_C_onfEta-IVLAmvUB-_7oew&usqp=CAU',
      link: 'https://www.google.com.br/books/edition/Jantar_Secreto/2o0pEQAAQBAJ?hl=pt-BR&gbpv=1&printsec=frontcover',
    },
    {
      id: 2,
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT94B7HyV0P4tvCqs0zApcU1SrCtZcuTHfGIw&s',
      link: 'https://dlivros.com/livro/assim-acaba-colleen-hoover',
    },
    {
      id: 3,
      imagem: 'https://images.dlivros.org/Colleen-Hoover/mil-partes-meu-coracao-colleen-hoover_large.webp',
      link: 'https://dlivros.com/livro/mil-partes-meu-coracao-colleen-hoover',
    },
    {
      id: 4,
      imagem: 'https://images.dlivros.org/Colleen-Hoover/assim-comeca-assim-acaba-2-colleen-hoover_large.webp',
      link: 'https://dlivros.com/livro/assim-comeca-assim-acaba-2-colleen-hoover',
    },
    {
      id: 5,
      imagem: 'https://images.dlivros.org/Loreth-Anne-White/sob-ponte-mal-loreth-anne-white_large.webp',
      link: 'http://dlivros.com/livro/sob-ponte-mal-loreth-anne-white',
    },
    {
      id: 6,
      imagem: 'https://images.dlivros.org/Tana-French/canto-segredos-tana-french_large.webp',
      link: 'https://dlivros.com/livro/canto-segredos-tana-french',
    },
    {
      id: 7,
      imagem: 'https://images.dlivros.org/Tana-French/dentro-espelho-tana-french_large.webp',
      link: 'https://dlivros.com/livro/dentro-espelho-tana-french',
    },
    {
      id: 8,
      imagem: 'https://images.dlivros.org/John-Green/culpa-estrelas-john-green_large.webp',
      link: 'https://dlivros.com/livro/culpa-estrelas-john-green',
    },
    {
      id: 9,
      imagem: 'https://images.dlivros.org/Timothy-Zahn/ultima-ordem-timothy-zahn_large.webp',
      link: 'https://dlivros.com/livro/ultima-ordem-timothy-zahn',
    },
  ];

  return (
    <div>
      {/* Banner */}
      <div className="banner">
        <h1>Bem-vindo à Biblioteca</h1>
        <img src={biblioteca} alt="Biblioteca" />
      </div>

      {/* Conteúdo Principal: Texto sobre a biblioteca */}
      <div className="conteudo-principal">
        <div className="informacoes">
          <h2>Sobre a Biblioteca</h2>
          <p>
            Somos uma biblioteca com uma vasta coleção de livros. Aqui você pode acessar e
            emprestar livros de diversos gêneros. Explore nossa biblioteca e aproveite nossas
            recomendações!
          </p>
        </div>
      </div>

      {/* Exibir livros */}
      <div className="livros">
        <h2>Alguns de Nossos Livros</h2>
        <div className="livros-lista">
          {livros.map((livro) => (
            <div key={livro.id} className="livro-card">
              <a href={livro.link}>
                <img src={livro.imagem} alt={`Livro ${livro.id}`} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
