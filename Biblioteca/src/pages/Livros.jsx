import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Livros = () => {
  const [livros, setLivros] = useState([]); // Estado para armazenar os livros
  const [loading, setLoading] = useState(true); // Estado para indicar se está carregando
  const [error, setError] = useState(null); // Estado para lidar com erros

  // useEffect para fazer a requisição GET assim que o componente for montado
  useEffect(() => {
    // Função para buscar os livros disponíveis
    const fetchLivros = async () => {
      try {
        const response = await axios.get('https://localhost:7057/api/Livro'); // URL da sua API
        setLivros(response.data); // Armazena os livros no estado
        setLoading(false); // Atualiza o estado de loading
      } catch (err) {
        setError('Erro ao carregar os livros'); // Se houver erro, armazena a mensagem de erro
        setLoading(false); // Atualiza o estado de loading
      }
    };

    fetchLivros();
  }, []); // O array vazio [] significa que o efeito será executado apenas uma vez, ao montar o componente

  if (loading) {
    return <div>Carregando livros...</div>; // Exibe enquanto os livros estão sendo carregados
  }

  if (error) {
    return <div>{error}</div>; // Exibe se ocorrer um erro durante a requisição
  }

  return (
    <div>
      <h1>Livros Disponíveis</h1>
      <ul>
        {livros.map((livro) => (
          <li key={livro.id}>
            <strong>{livro.titulo}</strong> - {livro.autor} ({livro.ano})
            <br />
            {livro.genero ? <em>{livro.genero}</em> : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Livros;
