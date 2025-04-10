import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router"; // Importando React Router
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"; // Exemplo de componente de conteúdo
import Livros from "./pages/Livros";
import Emprestimos from "./pages/Emprestimos";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        
        {/* Definindo as rotas e os componentes a serem renderizados */}
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/livros" element={<Livros />} />
            <Route path="/emprestimos" element={<Emprestimos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </div>

      
      </div>
    </Router>
  );
}

export default App;
