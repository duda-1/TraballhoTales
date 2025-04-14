import React from 'react';
import './Footer.css';

const Footer = () => {
  return (

    <section className='rodape'>
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Biblioteca Central. Todos os direitos reservados.</p>
        <div className="footer-links">
          <a href="/contato">Contato</a>
          <a href="/sobre">Sobre</a>
          <a href="/termos">Termos de Uso</a>
        </div>
      </div>
    </footer>
    </section>
  );
};

export default Footer;
