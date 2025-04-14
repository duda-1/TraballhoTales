import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Emprestimos.css';

const Emprestimos = () => {
  const [emprestimos, setEmprestimos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEmprestimos = async () => {
      try {
        const response = await axios.get('https://localhost:7057/api/Emprestimos');
        const emprestimosData = response.data;

        const emprestimosComDetalhes = await Promise.all(
          emprestimosData.map(async (emprestimo) => {
            let livroNome = 'Nome do livro indisponível';
            let usuarioNome = 'Nome do usuário indisponível';

            try {
              const livroRes = await axios.get(`https://localhost:7057/api/Livro/${emprestimo.livro_Id}`);
              livroNome = livroRes.data?.nome || livroNome;
            } catch (livroError) {
              console.error(`Erro ao buscar o livro com ID ${emprestimo.livro_Id}:`, livroError);
            }

            try {
              const usuarioRes = await axios.get(`https://localhost:7057/api/Usuarios/${emprestimo.usuario_Id}`);
              usuarioNome = usuarioRes.data?.nome || usuarioNome;
            } catch (usuarioError) {
              console.error(`Erro ao buscar o usuário com ID ${emprestimo.usuario_Id}:`, usuarioError);
            }

            // Retorna uma cópia do objeto emprestimo com os nomes atualizados
            return {
              ...emprestimo,
              livroNome,
              usuarioNome,
            };
          })
        );

        // Atualiza o estado com a lista completa de empréstimos
        setEmprestimos(emprestimosComDetalhes);
      } catch (err) {
        console.error('Erro ao carregar os empréstimos:', err);
        setError('Erro ao carregar os empréstimos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmprestimos();
  }, []);

  const filteredEmprestimos = emprestimos.filter((emprestimo) => {
    const livroNome = emprestimo.livroNome?.toLowerCase() || '';
    const usuarioNome = emprestimo.usuarioNome?.toLowerCase() || '';
    const term = searchTerm.toLowerCase();

    return livroNome.includes(term) || usuarioNome.includes(term);
  });

  if (loading) {
    return <div className="loading">Carregando seus empréstimos...</div>;
  }

  if (error) {
    return <div className="erro">{error}</div>;
  }

  return (
    <div className="emprestimos-page">
      <h2>Todos os Empréstimos</h2>
      <input
        type="text"
        placeholder="Pesquisar pelo nome do livro ou usuário..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="emprestimos-container">
        {filteredEmprestimos.length === 0 ? (
          <p>Nenhum empréstimo encontrado.</p>
        ) : (
          filteredEmprestimos.map((emprestimo) => (
            <div key={emprestimo.id} className="emprestimo-card">
              <p><strong>Livro:</strong> {emprestimo.livroNome}</p>
              <p><strong>Usuário:</strong> {emprestimo.usuarioNome}</p>
              <p>
                <strong>Data do Empréstimo:</strong>{' '}
                {new Date(emprestimo.data_emprestimo).toLocaleDateString()}
              </p>
              <p>
                <strong>Data de Devolução:</strong>{' '}
                {new Date(emprestimo.data_devolucao).toLocaleDateString()}
              </p>
              <p>
                <strong>Devolvido:</strong> {emprestimo.devolvido ? 'Sim' : 'Não'}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Emprestimos;
