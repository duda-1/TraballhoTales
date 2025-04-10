import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router"; // Corrigido: useLocation é de react-router-dom
import './Nav.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const location = useLocation();

  // Verifica scroll para aplicar estilo
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    // Verifica se o usuário está logado
    const nomeUsuario = localStorage.getItem('usuarioLogado');
    setUsuarioLogado(nomeUsuario);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-logo">📚 Biblioteca</div>
      <nav className="navbar-links">
        <Link to="/home" className={`navbar-link ${isActive('/home')}`}>Home</Link>
        <Link to="/livros" className={`navbar-link ${isActive('/livros')}`}>Livros</Link>
        <Link to="/emprestimos" className={`navbar-link ${isActive('/emprestimos')}`}>Empréstimos</Link>

        {!usuarioLogado ? (
          <Link to="/login" className={`navbar-link ${isActive('/login')}`}>Login</Link>
        ) : (
          <Link to="/perfil" className={`navbar-link ${isActive('/perfil')}`}>Perfil</Link>
        )}
        <p>....</p>
      </nav>
    </header>
  );
};

export default Navbar;
