import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './Home.css'; // Estilos para o componente

const Home = () => {
  const [livros, setLivros] = useState([]);

  // Carregar livros da API
  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await axios.get('https://localhost:7057/api/Livro'); // Substitua com o seu endpoint
        setLivros(response.data);
      } catch (error) {
        console.error('Erro ao buscar os livros:', error);
      }
    };

    fetchLivros();
  }, []);

  // Configuração do carrossel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      {/* Banner */}
      <div className="banner">
        <h1>Bem-vindo à Biblioteca</h1>
        <img src="https://via.placeholder.com/1200x400" alt="Biblioteca" />
      </div>

      {/* Texto sobre a biblioteca */}
      <div className="informacoes">
        <h2>Sobre a Biblioteca</h2>
        <p>Somos uma biblioteca com uma vasta coleção de livros. Aqui você pode acessar e emprestar livros de diversos gêneros.</p>
      </div>

      {/* Carrossel de Imagens */}
      <div className="carrossel">
        <Slider {...settings}>
          <div>
            <img src="https://via.placeholder.com/300x200" alt="Imagem 1" />
          </div>
          <div>
            <img src="https://via.placeholder.com/300x200" alt="Imagem 2" />
          </div>
          <div>
            <img src="https://via.placeholder.com/300x200" alt="Imagem 3" />
          </div>
        </Slider>
      </div>

      {/* Exibir livros */}
      <div className="livros">
        <h2>Livros Disponíveis</h2>
        <div className="livros-lista">
          {livros.length > 0 ? (
            livros.map((livro) => (
              <div key={livro.id} className="livro-card">
                <h3>{livro.titulo}</h3>
                <p>{livro.autor}</p>
                <img src={livro.imagemUrl} alt={livro.titulo} />
              </div>
            ))
          ) : (
            <p>Carregando livros...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
