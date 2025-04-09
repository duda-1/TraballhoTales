import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Livros = () => {
  const [livros, setLivros] = useState([]); // Estado para armazenar os livros
  const [loading, setLoading] = useState(true); // Estado para indicar se está carregando
  const [error, setError] = useState(null); // Estado para erros

  // useEffect para fazer a requisição GET assim que o componente for montado
  useEffect(() => {
    // Função para buscar os livros disponíveis
    const fetchLivros = async () => {
      try {
        // Fazendo a requisição GET para a API
        const response = await axios.get('https://localhost:7057/api/Livro'); // URL da sua API
        if (response.data) {
          setLivros(response.data); // Armazena os livros no estado
        } else {
          throw new Error('Resposta da API não contém dados');
        }
        setLoading(false); // Atualiza o estado de loading
      } catch (err) {
        console.error("Erro ao carregar os livros:", err);
        setError('Não foi possível carregar os livros. Tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchLivros();
  }, []); // O array vazio [] significa que o efeito será executado apenas uma vez, ao montar o componente

  if (loading) {
    return <div>Carregando livros...</div>; // Exibe enquanto os livros estão sendo carregados
  }

  if (error) {
    return <div>{error}</div>; // Exibe erro caso ocorra
  }

  return (
    <div>
      <h4>Livros Disponíveis</h4>
      <ul>
        {livros.length > 0 ? (
          livros.map((livro) => (
            <li key={livro.id}>
              <strong>{livro.titulo}</strong> - {livro.autor} ({livro.ano})
              <br />
              {livro.genero && <em>{livro.genero}</em>}
            </li>
          ))
        ) : (
          <p>Não há livros disponíveis.</p>
        )}
      </ul>
    </div>
  );
};

export default Livros;
