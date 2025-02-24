import React, {useEffect, useState} from 'react';
import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';
import "../estilos/menuSuperior.css";
import { useAuth } from '../login/AuthProvider'
import Modal from './Modal';
import ModalCarro from './DetalleCarrito';

const MenuSuperior = ({nombre, setNombre, nivel, setNivel, xp, setXp, objetos}) => {
  
  const { user } = useAuth();

  const [carritoVisible, setCarritoVisible] = useState(false);

  const toggleCarrito = () => {
    setCarritoVisible(!carritoVisible);
  };

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
            <button className="nav-button"><Link to="/">Inicio</Link></button>
            <button className="nav-button"><Link to="/detalles">Detalles</Link></button>
            <button className="nav-button"><Link to="/compra">Compra</Link></button>
            <button className="nav-button"><Link to="/carro">Carro</Link></button>
            <button className='nav-button'>Cerrar Sesion</button>
        </div>

        <button className="icon-button" onClick={toggleCarrito}>
            <Book size={32} />
        </button>

        <Modal isOpen={carritoVisible} onClose={()=>toggleCarrito()}>
        <ModalCarro objetos={objetos}/>
        </Modal>
    </nav>
  );
}

export default MenuSuperior;