import React, {useEffect} from 'react';
import { Book } from 'lucide-react';
import "../estilos/menuSuperior.css";
import { useAuth } from '../login/AuthProvider'

const MenuSuperior = ({nombre, setNombre, nivel, setNivel, xp, setXp}) => {
  
  const { user } = useAuth();

  //Importante el useEffect, si no esta peta el programa porque no se puede modificar una variable de la App desde un componente hijo mientras este  se renderiza
  //Para lograr eso es que sirve el useEffect.
  useEffect(() => {
    if (user != null) {
      console.log(user)
      setNombre(user.nombre);
      setNivel(user.nivel);
      setXp(user.xp);
    }
  }, [user, setNombre, setNivel, setXp]);

  return (
    <nav className="navbar">  
        <div className="profile-img"></div>
        <span className="username">{nombre}</span>
        <span className="level-indicator">Lvl {nivel} • {xp} XP</span>
        
        <div className="nav-container">
            <button className="nav-button">Inicio</button>
            <button className="nav-button">Detalles</button>
            <button className='nav-button'>Cerrar Sesion</button>
        </div>

        <button className="icon-button">
            <Book size={32} />
        </button>
    </nav>
  );
}

export default MenuSuperior;