import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ServicioMisiones from '../../servicios/axios/ServicioMisiones';

function MisionEditar({producto, setInformacion, onClose}) {
  // Almacenar los errores del formulario
  const [errores, setErrores] = useState({});
  
  // Almacenar los valores del formulario
  const [form, setForm] = useState({
    nombre: producto.nombre,
    precio: producto.precio,
    url: producto.url,
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

    // Validación para "precio"
    if (form.precio <= 0 || form.precio > 100) {
      nuevosErrores.precio = 'El precio debe de ser mayor que 0 pero menor que 100';
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
      
      const editarAficion = {          
        nombre: form.nombre,
        precio: form.precio,
        url: form.url,
      };

      //Enviar por Axios al Json de BD
      ServicioInformacion.update(producto.id, editarAficion)
      .then(response => {
        Swal.fire("Afición Actualizada correctamente"); 
        // Limpiar el formulario después de agregar
        setForm({
          nombre: '',
          precio: '',
          url: '',
        });

        ServicioInformacion.getAll()
            .then((response) => {
              setInformacion(response.data);
            });

        // Cerrar el modal
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
      <label htmlFor="nombre">Nombre de la Afición Editar</label>
      <input
        id="nombre"
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={gestionarCambio}
        placeholder="Escribe el nombre de la afición"
      />
      {errores.nombre && <p className="error">{errores.nombre}</p>}

      {/* Campo de texto para precio */}
      <label htmlFor="precio">Descripción del Precio</label>
      <textarea
        id="precio"
        name="precio"
        value={form.precio}
        onChange={gestionarCambio}
        placeholder="Especifica el precio"
      />
      {errores.precio && <p className="error">{errores.precio}</p>}

      {/* Botón de envío */}
      <button type="submit">Enviar</button>
    </form>
  );
}

export default MisionEditar;
