import React, { useState } from 'react';
import ServicioMisiones from '../../servicios/axios/ServicioMisiones';
import Swal from 'sweetalert2';


function MisionCrear({informacion, setInformacion, onClose}) {
  // Almacenar los errores del formulario
  const [errores, setErrores] = useState({});
  
  // Almacenar los valores del formulario
  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    url: '',
  });

  //////////////////////////////////////
  // Función para gestionar los cambios en los campos del formulario
  //////////////////////////////////////
  const gestionarCambio = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === 'precio' ? Number(value) : value,
    });
  };

  //////////////////////////////////////
  // Función de validación
  //////////////////////////////////////
  const validar = () => {
    const nuevosErrores = {};

    // Validación para "nombre"
    if (!form.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }

    
    // Validación para "descripcion"
    if (form.precio <= 0 || form.precio >= 100) {
      nuevosErrores.precio = 'El precio no puede ser menor o igual a 0 ni superar los 100 euros';
    }

    setErrores(nuevosErrores);

    // Retorna true si no hay errores, de lo contrario retorna false
    return Object.keys(nuevosErrores).length === 0;
  };

  // Función para manejar el envío del formulario
  const enviarFormulario = (e) => {
    e.preventDefault();

    // Validar antes de enviar
    if (validar()) {
      console.clear();
      console.log('Formulario Enviado', form);
      
      const nuevoProducto = {          
        nombre: form.nombre,
        precio: form.precio,
        url:'',
      };

     

      //Enviar por Axios al Json de BD
      ServicioInformacion.create(nuevoProducto)
      .then(response => {
        Swal.fire("Producto creado satisfactoriamente"); 
        // Limpiar el formulario después de agregar
        setForm({
          nombre: '',
          precio: '',
          url:'',
        });
       
        // Le ponemos el id correcto de la BD
        nuevoProducto.id=response.data.id

         // Actualizar el estado local de aficiones
        setInformacion([...informacion, nuevoProducto]);

        //Cerramos el modal
        onClose();
       
      })
      .catch(error => {
        Swal.fire("ERROR, Al crear producto"); 
      });

    }
   
  };

  return (
    <form onSubmit={enviarFormulario}>
      {/* Campo de texto para nombre */}
      <label htmlFor="nombre">Nombre del Producto a añadir</label>
      <input
        id="nombre"
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={gestionarCambio}
        placeholder="Escribe el nombre del producto"
      />
      {errores.nombre && <p className="error">{errores.nombre}</p>}

      {/* Campo de texto para descripción */}
      <label htmlFor="precio">Precio del producto</label>
      <textarea
        id="precio"
        type="number"
        name="precio"
        value={form.precio}
        onChange={gestionarCambio}
        placeholder="Pon el precio del producto"
      />
      {errores.precio && <p className="error">{errores.precio}</p>}

      {/* Botón de envío */}
      <button type="submit">Enviar</button>
    </form>
  );
}

export default MisionCrear;
