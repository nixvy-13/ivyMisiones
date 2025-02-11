import React from 'react';
import { Book } from 'lucide-react';
import "../estilos/menuSuperior.css";

const MenuSuperior = ({exp, nivel}) => {
  return (
    <nav className="navbar">  
        <div className="profile-img"></div>
        <span className="username">Monokrome</span>
        <span className="level-indicator">Lvl {nivel} • {exp} XP</span>
        
        <div className="nav-container">
            <button className="nav-button">Inicio</button>
            <button className="nav-button">Detalles</button>
        </div>

        <button className="icon-button">
            <Book size={32} />
        </button>
    </nav>
  );
}

export default MenuSuperior;