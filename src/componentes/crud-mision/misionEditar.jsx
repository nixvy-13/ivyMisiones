import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ServicioMisiones from '../../servicios/axios/ServicioMisiones';

function MisionEditar({mision, setInformacion, onClose}) {
  // Almacenar los errores del formulario
  const [errores, setErrores] = useState({});
  
  // Almacenar los valores del formulario
  const [form, setForm] = useState({
      titulo: '',
      descripcion: '',
      dificultad: '',
      xp: '',
    });

  //////////////////////////////////////
  // Función para gestionar los cambios en los campos del formulario
  //////////////////////////////////////
  const gestionarCambio = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === 'xp' ? Number(value) : value,
    });
  };

  //////////////////////////////////////
  // Función de validación
  //////////////////////////////////////
  const validar = () => {
    const nuevosErrores = {};

    // Validación para "titulo"
    if (!form.titulo.trim()) {
      nuevosErrores.titulo = 'El título es obligatorio';
    }

    // Validación para "descripcion"
    if (!form.descripcion.trim()) {
      nuevosErrores.descripcion = 'La descripción es obligatoria';
    }

    // Validación para "dificultad"
    if (!form.dificultad.trim()) {
      nuevosErrores.dificultad = 'La dificultad es obligatoria';
    }

    // Validación para "xp"
    if (form.xp <= 0 || form.xp > 500) {
      nuevosErrores.xp = 'La experiencia de la misión debe ser entre 1 y 500';
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
      
      const editarMision = {
        titulo: form.titulo,
        descripcion: form.descripcion,
        dificultad: form.dificultad,
        xp: form.xp,
      };

      //Enviar por Axios al Json de BD
      ServicioMisiones.update(mision.id, editarMision)
      .then(response => {
        Swal.fire("Misión actualizada correctamente"); 
        // Limpiar el formulario después de agregar
        setForm({
          titulo: '',
          descripcion: '',
          dificultad: '',
          xp:'',
        });

        ServicioMisiones.getAll()
            .then((response) => {
              setInformacion(response.data);
            });

        // Cerrar el modal  
        onClose();
       
      })
      .catch(error => {
        Swal.fire("ERROR, Al editar mision"); 
      });
    }
  };

  return (
    <form onSubmit={enviarFormulario}>
      {/* Campo de texto para titulo */}
      <label htmlFor="titulo">Titulo de la misión a añadir</label>
      <input
        id="titulo"
        type="text"
        name="titulo"
        value={form.titulo}
        onChange={gestionarCambio}
        placeholder={mision.titulo}
      />
      {errores.titulo && <p className="error">{errores.titulo}</p>}

      {/* Campo de texto para descripción */}
      <label htmlFor="descripcion">Descripción de la misión</label>
      <textarea
        id="descripcion"
        type="text"
        name="descripcion"
        value={form.descripcion}
        onChange={gestionarCambio}
        placeholder={mision.descripcion}
      />
      {errores.descripcion && <p className="error">{errores.descripcion}</p>}

      {/* Campo de options para dificultad */}
      <label htmlFor="dificultad">Dificultad</label>
      <select
        id="dificultad"
        name="dificultad"
        value={form.dificultad}
        onChange={gestionarCambio}
      >
        <option value="">Seleccione una dificultad</option>
        <option value="facil">Fácil</option>
        <option value="media">Media</option>
        <option value="dificil">Difícil</option>
        <option value="maestro">Maestro</option>
      </select>
      {errores.dificultad && <p className="error">{errores.dificultad}</p>}

      {/* Campo numerico para xp */}
      <label htmlFor="xp">XP de la misión</label>
      <input
        id="xp"
        type="number"
        name="xp"
        value={form.xp}
        onChange={gestionarCambio}
        placeholder={mision.xp}
      />
      {errores.xp && <p className="error">{errores.xp}</p>}

      {/* Botón de envío */}
      <button type="submit">Enviar</button>
    </form>
  );
}

export default MisionEditar;
