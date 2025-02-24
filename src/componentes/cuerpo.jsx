import { buscarObjeto , incrementarCantidad } from '../herramientas/buscarProducto';
import '../estilos/cuerpo.css';


// Componente ListaImagenes
const ListaImagenes = ({ total, setTotal , objetos, setObjetos , info}) => {
  
  const AnadirProducto = (nombre, precio) => {    
    
    
    setTotal(total + precio);    

    let objetoAnadir= buscarObjeto(info,nombre)

    if(buscarObjeto(objetos,nombre)===null){     
      
      setObjetos([...objetos,
        { url: objetoAnadir.url, nombre: objetoAnadir.nombre, precio: objetoAnadir.precio, cantidad:1 }])

    }else{

      setObjetos(incrementarCantidad(objetos , nombre))

    }

    
   
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
    </div>
  );
};

export default ListaImagenes;