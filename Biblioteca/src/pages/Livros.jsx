import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './Livros.css';

const Livros = () => {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  
  // Novos estados para os inputs do modal
  const [inputUsuarioId, setInputUsuarioId] = useState('');
  const [message, setMessage] = useState({ visible: false, text: '', type: '' });
  
  const navigate = useNavigate();
  
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

  const handleEmprestimo = (livro) => {
    // Ao clicar, abre o modal e preenche com o id do livro selecionado
    setLivroSelecionado(livro);
    setShowModal(true);
  };

  const handleSubmitEmprestimo = async (e) => {
    e.preventDefault();

    // Verifica se o usuário digitou seu id
    if (!inputUsuarioId) {
      setMessage({ visible: true, text: 'Por favor, digite seu ID.', type: 'erro' });
      setTimeout(() => {
        setMessage({ visible: false, text: '', type: '' });
      }, 3000);
      return;
    }

    const dataEmprestimo = new Date();
    const dataDevolucao = new Date();
    dataDevolucao.setMonth(dataDevolucao.getMonth() + 1); // data de devolução para o mês seguinte

    const emprestimoData = {
      livro_Id: livroSelecionado.id,               // ID do livro selecionado
      usuario_Id: Number(inputUsuarioId),           // ID digitado pelo usuário
      data_emprestimo: dataEmprestimo,
      data_devolucao: dataDevolucao,
      devolvido: false
    };

    try {
      await axios.post('https://localhost:7057/api/Emprestimo', emprestimoData);
      setMessage({ visible: true, text: 'Livro emprestado com sucesso!', type: 'sucesso' });
      setShowModal(false);
      // Limpa o input do usuário, se desejado
      setInputUsuarioId('');
      setTimeout(() => {
        setMessage({ visible: false, text: '', type: '' });
      }, 3000);
    } catch (err) {
      console.error('Erro ao emprestar livro:', err);
      setMessage({ visible: true, text: 'Erro ao emprestar o livro. Tente novamente.', type: 'erro' });
      setTimeout(() => {
        setMessage({ visible: false, text: '', type: '' });
      }, 3000);
    }
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
                <button className="btn-emprestar" onClick={() => handleEmprestimo(livro)}>
                  Pegar Livro Emprestado
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal para inserir os IDs */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Preencha os dados para pegar o livro emprestado</h3>
            <form onSubmit={handleSubmitEmprestimo}>
              <div className="input-group">
                <label>Seu ID:</label>
                <input 
                  type="number" 
                  value={inputUsuarioId} 
                  onChange={(e) => setInputUsuarioId(e.target.value)} 
                  required 
                />
              </div>
              <div className="input-group">
                <label>ID do Livro:</label>
                <input 
                  type="number" 
                  value={livroSelecionado?.id || ''} 
                  readOnly 
                />
              </div>
              <div className="modal-buttons">
                <button type="submit">Confirmar Empréstimo</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mensagem de sucesso/erro */}
      {message.visible && (
        <div className={`message-container ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Livros;
