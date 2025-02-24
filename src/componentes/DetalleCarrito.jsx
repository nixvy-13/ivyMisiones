import { Link } from 'react-router-dom';
import { incrementarCantidad, incrementarCantidadEspecifica } from '../herramientas/buscarProducto';
import "../estilos/detalleCarrito.css";



const DetalleCarrito = ({ objetos, setObjetos , total, setTotal}) => {

   
  function incrementar(objeto){
    // Actualizamos lista de objetos
    setObjetos(incrementarCantidad(objetos, objeto.nombre))
    //Actualiamos el total
    setTotal(total + objeto.precio);    
  
  }
  function incrementarPorCantidad(objeto, cantidad){
    setObjetos(incrementarCantidadEspecifica(objetos, objeto.nombre, cantidad));
    
    setTotal(total + (objeto.precio * cantidad));
  }

  return (
    <div className="container-detalle">
      <ul>
        <h2>objetos Seleccionados</h2>
        {objetos.map((objeto, index) => {
          return (
            <li key={index} className="producto-item">
              <div className="producto-detalle">
                <span>
                  {objeto.cantidad} x {objeto.nombre} : {objeto.precio}Є
                </span>
                <Link to={`/objeto/${objeto.nombre}`}>
                  <img src={objeto.url} alt={objeto.nombre} />
                </Link>
              </div>

              {/* Botones para incrementar/reducir cantidad */}
              <div className="objeto-acciones">                
                <button
                  className="btn-incrementar"
                  onClick={() =>
                    incrementar(objeto)
                  }
                >
                  +
                </button>
                <button
                  className="btn-incrementar"
                  onClick={() =>
                    incrementarPorCantidad(objeto, parseInt(prompt("¿Cuantos objetos quieres añadir?")))
                  }
                >
                  *
                </button>
              </div>
            </li>
          );
        })}
        <li className="total">Número de Elementos: {objetos.length}</li>
      </ul>
    </div>
  );
};

export default DetalleCarrito;