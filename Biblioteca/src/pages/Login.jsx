// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './Login.css';

const Login = () => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('https://localhost:7057/api/Login', {
        nome,
        senha,
      });

      if (response.status === 200) {
        const { usuarioId, usuarioNome } = response.data;

        console.log('Usuário logado:', response.data); // 🐛 debug

        localStorage.setItem('usuarioId', usuarioId); // ✅ agora salva corretamente
        localStorage.setItem('usuarioLogado', usuarioNome);

        setMessage('Login bem-sucedido!');

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setMessage('Nome ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setMessage('Erro ao tentar fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='login'>
      <div className="login-container">
        <h2>Login</h2>

        {message && <div className="message">{message}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="cadastro-link">
          <p>Não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
        </div>
      </div>
    </section>
  );
};

export default Login;
