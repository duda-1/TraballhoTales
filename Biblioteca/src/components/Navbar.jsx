import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router"; // ✅ Corrigido para react-router-dom
import './Nav.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(localStorage.getItem('usuarioLogado'));
  const location = useLocation();

  // Detectar scroll para aplicar estilo
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // ✅ Atualiza dinamicamente quando localStorage mudar
    const checkLoginStatus = () => {
      setUsuarioLogado(localStorage.getItem('usuarioLogado'));
    };

    // Checa login a cada 1 segundo (ou use custom events para performance ideal)
    const interval = setInterval(checkLoginStatus, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Função para destacar link ativo
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
     <Link to="/" className="navbar-logo">📚 Biblioteca</Link>


      <nav className="navbar-links">
        <Link to="/" className={`navbar-link ${isActive('/')}`}>Home</Link>
        <Link to="/livros" className={`navbar-link ${isActive('/livros')}`}>Livros</Link>
        <Link to="/emprestimos" className={`navbar-link ${isActive('/emprestimos')}`}>Empréstimos</Link>

        {!usuarioLogado ? (
          <Link to="/login" className={`navbar-link ${isActive('/login')}`}>Login</Link>
        ) : (
          <Link to="/perfil" className={`navbar-link ${isActive('/perfil')}`}>Perfil</Link>
        )}
        <p>......</p>
      </nav>
    </header>
  );
};

export default Navbar;
