import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Perfil.css';

const Perfil = ({ onClose }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  const usuarioId = localStorage.getItem('usuarioId');

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
          telefone: response.data.telefone || ''
        });
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [usuarioId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSalvar = async () => {
    try {
      await axios.put(`https://localhost:7057/api/Usuarios/${usuarioId}`, formData);
      setUsuario(formData);
      setEditando(false);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('usuarioId');
    onClose();
    window.location.reload(); // ou redireciona para login
  };

  return (
    <div className="perfil-overlay" onClick={onClose}>
      <div className="perfil-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Perfil do Usuário</h2>

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
      </div>
    </div>
  );
};

export default Perfil;
