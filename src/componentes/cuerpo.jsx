import { buscarObjeto , incrementarCantidad } from '../herramientas/buscarProducto';
import '../estilos/cuerpo.css';
import { ToastContainer, toast } from "react-toastify";

// Componente ListaImagenes
const ListaImagenes = ({ total, setTotal , objetos, setObjetos , info, permitirNotificaciones}) => {
  
  const notify = (producto, cantidadTotal) => {
    toast(`Uso de Storage: se ha añadido ${producto} al carrito`);
    toast(
      `Uso de Storage: se ha cambiado el importe total a ${cantidadTotal} Euros`
    );
  }
  
  const AnadirProducto = (nombre, precio) => {
    
    let totalActualizado = parseInt(total) + parseInt(precio);    
    setTotal(totalActualizado);

    let objetoAnadir= buscarObjeto(info,nombre)

    if(buscarObjeto(objetos,nombre)===null){     

      setObjetos([...objetos,
      
        { url: objetoAnadir.url, nombre: objetoAnadir.nombre, precio: objetoAnadir.precio, cantidad:1 }])
    }else{
      setObjetos(incrementarCantidad(objetos , nombre))
    }
    if (permitirNotificaciones) notify(nombre, totalActualizado);   
  };

  return (
    <div className="container">
      {info.map((item, index) => (
        <div key={index}>
          <img src={item.url} alt="imagen" />
          <h3>{item.nombre}</h3>
          <p>Precio: {item.precio} Euros</p>
          <button onClick={() => AnadirProducto(item.nombre, item.precio)}>
            Añadir al carrito
          </button>
        </div>
      ))}
    <ToastContainer />
    </div>
  );
};

export default ListaImagenes;