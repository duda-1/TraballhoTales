import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Livros.css';

const Livros = () => {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await axios.get('https://localhost:7057/api/Livro');
        if (response.data) {
          setLivros(response.data);
        } else {
          throw new Error('Resposta da API não contém dados');
        }
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar os livros:", err);
        setError('Não foi possível carregar os livros. Tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchLivros();
  }, []);

  // Função para agrupar livros por gênero
  const agruparPorGenero = (livros) => {
    return livros.reduce((grupos, livro) => {
      const genero = livro.genero || 'Outros';
      if (!grupos[genero]) {
        grupos[genero] = [];
      }
      grupos[genero].push(livro);
      return grupos;
    }, {});
  };

  if (loading) {
    return <div className="loading">Carregando livros...</div>;
  }

  if (error) {
    return <div className="erro">{error}</div>;
  }

  const livrosPorGenero = agruparPorGenero(livros);

  return (
    <div className="livros-container">
      <h2>Livros Disponíveis</h2>
      {Object.entries(livrosPorGenero).map(([genero, livrosDoGenero]) => (
        <div key={genero} className="genero-section">
          <h3 className="genero-titulo">{genero}</h3>
          <div className="livros-grid">
            {livrosDoGenero.map((livro) => (
              <div key={livro.id} className="livro-card">
                <img
                  src={`https://localhost:7057/imagens/${livro.imagemUrl}`}
                  alt={livro.titulo}
                  className="livro-imagem"
                />
                <div className="livro-info">
                  <h4>{livro.titulo}</h4>
                  <p><strong>Autor:</strong> {livro.autor}</p>
                  <p><strong>Ano:</strong> {livro.ano}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Livros;
