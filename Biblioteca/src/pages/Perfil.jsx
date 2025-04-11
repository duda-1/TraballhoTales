import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Perfil.css';
import { useNavigate } from 'react-router';

const Perfil = ({ onClose }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [showMessage, setShowMessage] = useState({ visible: false, text: '', type: '' });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: ''
  });

  const usuarioId = localStorage.getItem('usuarioId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      if (!usuarioId) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`https://localhost:7057/api/Usuarios/${usuarioId}`);
        setUsuario(response.data);
        setFormData({
          nome: response.data.nome,
          email: response.data.email,
          telefone: response.data.telefone || '',
          senha: response.data.senha || ''
        });
      } catch (error) {
        exibirMensagem('Erro ao buscar dados do usuário', 'erro');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [usuarioId]);

  const exibirMensagem = (text, type = 'sucesso') => {
    setShowMessage({ visible: true, text, type });
    setTimeout(() => {
      setShowMessage({ visible: false, text: '', type: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSalvar = async () => {
    try {
      const payload = {
        id: Number(usuarioId),
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        senha: formData.senha
      };

      const response = await axios.put(`https://localhost:7057/api/Usuarios/${usuarioId}`, payload);

      if (response.status === 204) {
        setUsuario({ ...usuario, ...formData });
        setEditando(false);
        exibirMensagem('Alterações salvas com sucesso!');
      } else {
        exibirMensagem('Erro ao salvar alterações.', 'erro');
      }
    } catch (error) {
      exibirMensagem('Erro ao atualizar o usuário.', 'erro');
    }
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true); // mostra modal de confirmação
  };

  const confirmLogout = () => {
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuarioLogado');
    navigate('/login'); // Navegar para o login após confirmar o logout
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false); // Fecha o modal de logout
  };

  const handleCloseModal = () => {
    if (typeof onClose === 'function') onClose(); // Chama a função onClose caso tenha sido passada
    navigate(-1); // Redireciona para a última página visitada
  };

  return (
    <div className="perfil-overlay" onClick={handleCloseModal}>
      <div className="perfil-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={handleCloseModal}>×</button>
        <h2>Bem-vindo, {usuario?.nome}</h2>

        {loading ? (
          <p>Carregando...</p>
        ) : usuario ? (
          <div className="perfil-info">
            {editando ? (
              <>
                <label>Nome:</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} />

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />

                <label>Telefone:</label>
                <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} />

                <button className="btn-editar" onClick={handleSalvar}>Salvar alterações</button>
              </>
            ) : (
              <>
                <p><strong>Nome:</strong> {usuario.nome}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Telefone:</strong> {usuario.telefone || 'Não informado'}</p>

                <div className="perfil-actions">
                  <button className="btn-editar" onClick={() => setEditando(true)}>Editar</button>
                  <button className="btn-sair" onClick={handleLogout}>Sair</button>
                </div>
              </>
            )}
          </div>
        ) : (
          <p>Não foi possível carregar os dados.</p>
        )}

        {showMessage.visible && (
          <div className={`mensagem ${showMessage.type}`}>
            {showMessage.text}
          </div>
        )}

        {showLogoutConfirm && (
          <div className="logout-modal">
            <p>Deseja realmente sair?</p>
            <div className="logout-buttons">
              <button onClick={confirmLogout} className="btn-confirmar">Sim</button>
              <button onClick={cancelLogout} className="btn-cancelar">Não</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;
