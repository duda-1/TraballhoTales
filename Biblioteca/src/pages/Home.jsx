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
      imagem: 'https://example.com/livro2.jpg',
      link: '/livro2',
    },
    {
      id: 3,
      imagem: 'https://example.com/livro3.jpg',
      link: '/livro3',
    },
    {
      id: 4,
      imagem: 'https://example.com/livro4.jpg',
      link: '/livro4',
    },
    {
      id: 5,
      imagem: 'https://example.com/livro5.jpg',
      link: '/livro5',
    },
    {
      id: 6,
      imagem: 'https://example.com/livro6.jpg',
      link: '/livro6',
    },
    {
      id: 7,
      imagem: 'https://example.com/livro7.jpg',
      link: '/livro7',
    },
    {
      id: 8,
      imagem: 'https://example.com/livro8.jpg',
      link: '/livro8',
    },
    {
      id: 9,
      imagem: 'https://example.com/livro9.jpg',
      link: '/livro9',
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
