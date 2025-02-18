import React, {useState } from 'react';
import '../estilos/inicio.css';
import ServicioMisiones from '../servicios/axios/ServicioMisiones';
import eliminarMision from './crud-mision/eliminarMision';
import Modal from './Modal';
import MisionEditar from './crud-mision/misionEditar';
import MisionCrear from './crud-mision/misionCrear';

function Inicio(){
    
// Almacenar los errores del Formulario
  const [errores, setErrores] = useState({});
  
  //Almacena la informacion del json, lo recoje del enviar formulario
  const [informacion, setInformacion] = useState([])

  // Almacenar la producto seleccionado
  const [misionSeleccionada, setMisionSeleccionada] = useState(null);

  //Guardar estado de los modales, se puede hacer sin mapa, si, pero queda mas bonito y ordenado asi
  const [modals, setModals] = useState({
    editar: false,
    crear: false,
  });                   

  //Funcion para cambiar el estado del mapa de modales
  const gestionarModal = (tipoModal, estadoAbierto) => {
    setModals((previoModals) => ({ ...previoModals, [tipoModal]: estadoAbierto }));
  };
  
  //Funcion para editar la informacion de un producto (abriendo su modal)
  const editarMision = (mision) => {
    setMisionSeleccionada(mision);
    gestionarModal('editar', true);
  }

  //Funcion para crear un nuevo producto
  const crearMision = () => {    
    gestionarModal("crear",true)
  };
  
  //Funcion para eliminar un producto
  const borrarMision = (mision) => {
    eliminarMision(mision, informacion, setInformacion);
  }

  //Funcion para marcar como completa una mision
  const completarMision = () => {
    marcarMisionCompleta(mision);
  }

  // Amacenar los valores del formulario(En todo momento!!!) 
  const [form, setForm] = useState({
    nombre: '', 
    dificultad: "",
    xpMinima: "",
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
    

    // Validar que el precio mínimo no sea negativo 

    // Solo validar la comparación si ambos precios están establecidos

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
        ServicioMisiones.getPorNombre(form.nombre)
          .then((response) => {
            setInformacion(response.data); // Actualiza el estado con los resultados
          })
          .catch((error) => {
            alert("No se ha podido descargar la información...");
            console.error(error); // Muestra el error en la consola
          });
      }
      // Si el campo de xpMinima esta lleno buscar por xpMinima
      else if (form.xpMinima.trim() !== "") {
        ServicioMisiones.getPorXp(form.xpMinima)
          .then((response) => {
            setInformacion(response.data); // Actualiza el estado con los resultados
          })
          .catch((error) => {
            alert("No se ha podido descargar la información...");
            console.error(error); // Muestra el error en la consola
          });
      }
        // Si el campo de dificultad está lleno, buscar por dificultad
      else if (form.dificultad.trim() !== "") {
        ServicioMisiones.getPorDificultad(form.dificultad)
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
      {/* Update the filters form structure */}
<div className="filters">
  <form onSubmit={enviarFormulario}>
    <div className="form-group">
      <label htmlFor="nombre">Nombre</label>
      <input
        id="nombre"
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={gestionarCambio}
        placeholder="Escribe el nombre de la mision"
      />
    </div>

    <div className="form-group">
      <label htmlFor="dificultad">Dificultad</label>
      <select
        id="dificultad"
        name="dificultad"
        value={form.dificultad}
        onChange={gestionarCambio}
      >
        <option value="">Seleccione una dificultad</option>
        <option value="facil">Fácil</option>
        <option value="media">Medio</option>
        <option value="dificil">Difícil</option>
        <option value="maestro">Maestro</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="xpMinima">Experiencia Minima</label>
      <input
        id="xpMinima"
        type="text"
        name="xpMinima"
        value={form.xpMinima}
        onChange={gestionarCambio}
        placeholder="xp Minima"
      />
    </div>

    <div className="button-group">
      <button type="submit">Buscar</button>
      <button type="button">Limpiar</button>
    </div>
  </form>
</div>

{/* Update the card structure */}
<div className="card-container">
  {informacion.map((mision, index) => (
    <div className="card" key={index}>
      <h3>{mision.titulo}</h3>
      <div className="xp">XP: {mision.xp}</div>
      <div className="description">{mision.descripcion}</div>
      <div className="actions">
        <div className="top-buttons">
          <button onClick={() => editarMision(mision)}>Editar</button>
          <button onClick={() => borrarMision(mision)}>Eliminar</button>
        </div>
        <button className="complete" onClick={() => completarMision(mision)}>
          Completar Misión
        </button>
      </div>
    </div>
  ))}
</div>

      <button className="add-mision-btn" onClick={crearMision}>Publicar Mision</button>
      {/* Poner por convencion los modales siempre antes de la ultima etiqueta, la vacia, la que marca el principio/fin 
      del return*/}
      <Modal isOpen={modals.editar} onClose={()=>gestionarModal('editar',false)}>
        <MisionEditar mision={misionSeleccionada} setInformacion={setInformacion} onClose={()=>gestionarModal('editar',false)}/>
      </Modal>
      <Modal isOpen={modals.crear} onClose={()=>gestionarModal('crear',false)}>
        <MisionCrear informacion={informacion} setInformacion={setInformacion} onClose={()=>gestionarModal('crear',false)}/>
      </Modal>
    </>
  
  );
}

export default Inicio;