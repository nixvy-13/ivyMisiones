import React, {useState } from 'react';
import '../estilos/inicio.css';
import ServicioMisiones from '../servicios/axios/ServicioMisiones';
import eliminarProducto from './crud-producto/eliminarProducto';
import Modal from './Modal';
import ProductoConsultar from './crud-producto/ProductoConsultar';
import ProductoEditar from './crud-producto/ProductoEditar';
import ProductoCrear from './crud-producto/ProductoCrear';

function Inicio(){
    
// Almacenar los errores del Formulario
  const [errores, setErrores] = useState({});
  
  //Almacena la informacion del json, lo recoje del enviar formulario
  const [informacion, setInformacion] = useState([])

  // Almacenar la producto seleccionado
  const [misionSeleccionada, setMisionSeleccionada] = useState(null);

  //Guardar estado de los modales, se puede hacer sin mapa, si, pero queda mas bonito y ordenado asi
  const [modals, setModals] = useState({
    consultar: false,
    editar: false,
    crear: false,
  });                   

  //Funcion para cambiar el estado del mapa de modales
  const gestionarModal = (tipoModal, estadoAbierto) => {
    setModals((previoModals) => ({ ...previoModals, [tipoModal]: estadoAbierto }));
  };
  
  //Funcion para abrir el modal de consultar
  const consultarMision = (mision) => {
    setMisionSeleccionada(mision);
    gestionarModal('consultar', true);
  }
  
  //Funcion para editar la informacion de un producto (abriendo su modal)
  const editarMision = (mision) => {
    setProductoSeleccionado(mision);
    gestionarModal('editar', true);
  }

  //Funcion para crear un nuevo producto
  const crearMision = () => {    
    gestionarModal("crear",true)
  };
  
  //Funcion para eliminar un producto
  const borrarMision = (producto) => {
    eliminarProducto(producto, informacion, setInformacion);
  }

  //Funcion para marcar como completa una mision
  const completarMision = () => {
    marcarMisionCompleta(mision);
  }

  // Amacenar los valores del formulario(En todo momento!!!) 
  const [form, setForm] = useState({
    nombre: '', 
    dificultad: "",
    expMinima: "",
  });

  //////////////////////////////////////
  // Función para gestionar los cambios en los campos del formulario
  //////////////////////////////////////
  const gestionarCambio = (e) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });


  };
  
  //////////////////////////////////////
  // Función de validación
  //////////////////////////////////////
  const validar = () => {
    const nuevosErrores = {};

    // Validar que el nombre no esté vacío si se ingresa
    if (form.nombre.trim() && !/^[a-zA-Z\s]+$/.test(form.nombre)) {
      nuevosErrores.nombre = 'El nombre solo puede contener letras y espacios.';
    }

    // Validar que los precios sean números válidos si se han introducido
    if (form.precioMenor.trim() && !Number.isInteger(Number(form.precioMenor))) {
      nuevosErrores.precioMenor = 'El precio mínimo de  be ser un número entero.';
    }
    if (form.precioMayor.trim() && !Number.isInteger(Number(form.precioMayor))) {
      nuevosErrores.precioMayor = 'El precio máximo debe ser un número entero.';
    }

    // Validar que el precio mínimo no sea negativo
    if (form.precioMenor.trim() && Number(form.precioMenor) < 0) {
      nuevosErrores.precioMenor = 'El precio mínimo no puede ser negativo.';
    } 

    // Solo validar la comparación si ambos precios están establecidos
    if (form.precioMenor.trim() && form.precioMayor.trim() && 
        Number(form.precioMenor) > Number(form.precioMayor)) {
      nuevosErrores.precioMenor = 'El precio mínimo no puede ser mayor que el precio máximo.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Función para manejar el envío del formulario
  //Importante, mirar el codigo para saber que hace antes de ponerse a tocar cosas, en este caso aqui ya estaba
  //obteniendo la informacion del axios en esta funcion y decidi hacer un useEffect arriba, lo que provocaba un bucle
  //Infinito de renders
  const enviarFormulario = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente
  
    // Validar el formulario antes de enviar
    if (validar()) {
      // Si el campo "nombre" está lleno, buscar por nombre
      if (form.nombre.trim() !== "") {
        ServicioInformacion.getPorNombre(form.nombre)
          .then((response) => {
            setInformacion(response.data); // Actualiza el estado con los resultados
          })
          .catch((error) => {
            alert("No se ha podido descargar la información...");
            console.error(error); // Muestra el error en la consola
          });
      }
      // Si los campos de precio están llenos, buscar por precio
      else if (form.precioMenor.trim() !== "" || form.precioMayor.trim() !== "") {
        ServicioInformacion.getPorPrecio(form.precioMenor, form.precioMayor)
          .then((response) => {
            setInformacion(response.data); // Actualiza el estado con los resultados
          })
          .catch((error) => {
            alert("No se ha podido descargar la información...");
            console.error(error); // Muestra el error en la consola
          });
      }
      // Si no se llenó ningún campo, mostrar un mensaje
      else {
        alert("Por favor, complete al menos un campo para buscar.");
      }
    } else {
      alert("Por favor, corrija los errores en el formulario antes de enviar.");
    }
  };


  return (
    <>
      <div className="filters">
        <form onSubmit={enviarFormulario}>
          {/* Campo de texto para nombre */}
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={gestionarCambio}
            placeholder="Escribe tu nombre"
          />
          {errores.nombre && <p className="error">{errores.nombre}</p>}

          {/* Campo de texto para apellidos */}
          <label htmlFor="apellidos">Precio Mínomo</label>
          <input
            id="precioMenor"
            type="text"
            name="precioMenor"
            value={form.precioMenor}
            onChange={gestionarCambio}
            placeholder="importe Mínimo"
          />
        

          <label htmlFor="apellidos">Precio Máximo</label>
          <input
            id="precioMayor"
            type="text"
            name="precioMayor"
            value={form.precioMayor}
            onChange={gestionarCambio}
            placeholder="importe Máximo"
          />
        

          <button type="submit">Bucar</button>
          <button type="button">Limpiar</button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio (€)</th>
            <th>URL</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="productTable">

          {informacion.map((item, index) => (
            <tr key={index}>

              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.precio}</td>
              <td><a href="#">Ver Producto</a></td>
              <td className="actions">
                {/* LOS ONCLICK SON FLECHAS, IMPORTANTE*/}
                {/* Importante tambien decirle a la funcion que llama el evento que le estas pasando,
                es decir, poner el objeto que le pases como parametro
                */}
                <button className="edit" onClick={() => editarProducto(item)}>Editar</button>
                <button className="delete" onClick={() => borrarProducto(item)}>Eliminar</button>
                <button className="view" onClick={() => consultarProducto(item)}>Consultar</button>
              </td>
            </tr>


          ))}


        </tbody>
      </table>

      <button className="add-aficion-btn" onClick={crearAficion}>Añadir Producto</button>
      {/* Poner por convencion los modales siempre antes de la ultima etiqueta, la vacia, la que marca el principio/fin 
      del return*/}
      <Modal isOpen={modals.consultar} onClose={()=>gestionarModal('consultar',false)}>
        <ProductoConsultar producto={productoSeleccionado}/>
      </Modal>
      <Modal isOpen={modals.editar} onClose={()=>gestionarModal('editar',false)}>
        <ProductoEditar producto={productoSeleccionado} setInformacion={setInformacion} onClose={()=>gestionarModal('editar',false)}/>
      </Modal>
      <Modal isOpen={modals.crear} onClose={()=>gestionarModal('crear',false)}>
        <ProductoCrear informacion={informacion} setInformacion={setInformacion} onClose={()=>gestionarModal('crear',false)}/>
      </Modal>
    </>

  );
}

export default Inicio;