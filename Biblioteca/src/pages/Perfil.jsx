import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Perfil.css';

const Perfil = ({ onClose }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      const usuarioId = localStorage.getItem('usuarioId');

      if (!usuarioId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://localhost:7057/api/Usuarios/${usuarioId}`);
        setUsuario(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, []);

  return (
    <div className="perfil-overlay" onClick={onClose}>
      <div className="perfil-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Perfil do Usuário</h2>

        {loading ? (
          <p>Carregando...</p>
        ) : usuario ? (
          <div className="perfil-info">
            <p><strong>Nome:</strong> {usuario.nome}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>Telefone:</strong> {usuario.telefone || 'Não informado'}</p>
          </div>
        ) : (
          <p>Não foi possível carregar os dados.</p>
        )}
      </div>
    </div>
  );
};

export default Perfil;
