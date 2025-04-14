import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './Emprestimos.css';

const Emprestimos = () => {
  const [emprestimos, setEmprestimos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Recupera o id do usuário do localStorage (definido no perfil, por exemplo)
  const usuarioId = localStorage.getItem('usuarioId');
  const navigate = useNavigate();

  useEffect(() => {
    // Se usuário não estiver logado, redireciona para o login
    if (!usuarioId) {
      navigate('/login');
      return;
    }
    
    const fetchEmprestimos = async () => {
      try {
        // Buscando os empréstimos do usuário na API
        const response = await axios.get(`https://localhost:7057/api/Emprestimo/${usuarioId}`);
        if (response.data) {
          setEmprestimos(response.data);
        } else {
          setError('Nenhum empréstimo encontrado.');
        }
      } catch (err) {
        console.error("Erro ao carregar os empréstimos:", err);
        setError('Erro ao carregar os empréstimos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmprestimos();
  }, [usuarioId, navigate]);

  if (loading) {
    return <div className="loading">Carregando seus empréstimos...</div>;
  }

  if (error) {
    return <div className="erro">{error}</div>;
  }

  return (
    <div className="emprestimos-container">
      <h2>Meus Empréstimos</h2>
      {emprestimos.length === 0 ? (
        <p>Você ainda não possui nenhum empréstimo.</p>
      ) : (
        emprestimos.map((emprestimo) => (
          <div key={emprestimo.Id} className="emprestimo-card">
            <p><strong>ID do Livro:</strong> {emprestimo.livro_Id}</p>
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
  );
};

export default Emprestimos;
