import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';  // Para navegação após cadastro
import './Cadastro.css';  // Estilos do formulário

const CadastroUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    nome: false,
    email: false,
    senha: false,
  });
  const navigate = useNavigate();  // Hook para navegação

  // Função para validação simples dos campos
  const validateForm = () => {
    const newErrors = { nome: false, email: false, senha: false };

    if (!nome) newErrors.nome = true;
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = true;
    if (!senha) newErrors.senha = true;

    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação do formulário
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const usuarioData = {
      nome,
      email,
      telefone,
      senha,
    };

    try {
      const response = await axios.post('https://localhost:7057/api/Usuarios', usuarioData);
      if (response.status === 201) {
        setMessage('Usuário cadastrado com sucesso!');
        setTimeout(() => {
          navigate('/login'); // Redireciona para a página de login
        }, 2000); // Aguardar 2 segundos antes de redirecionar
      } else {
        setMessage('Erro ao cadastrar usuário.');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setMessage('Erro ao cadastrar. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (

    <section className='cadastro'>
    <div className="cadastro-container">
      <h2>Cadastro de Usuário</h2>

      {message && <div className="message">{message}</div>}

      <form onSubmit={handleSubmit} className="cadastro-form">
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={errors.nome ? 'input-error' : ''}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'input-error' : ''}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone (opcional):</label>
          <input
            type="text"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={errors.senha ? 'input-error' : ''}
            required
          />
        </div>

        <button type="submit" className="btn-cadastrar" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      <div className="login-link">
        <p>Já tem uma conta? <a href="/login">Faça login</a></p>
      </div>
    </div>
    </section>
  );
};

export default CadastroUsuario;
