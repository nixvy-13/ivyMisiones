import ServicioMisiones from '../../servicios/axios/ServicioMisiones';
import ServicioUsuarios from '../../servicios/axios/ServicioUsuarios';
import Swal from 'sweetalert2';

const eliminarMision = (mision, informacion, setInformacion, user, setUser) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás revertir esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      ServicioMisiones.delete(mision.id)
        .then(() => {
          // Actualizar la lista de misiones en pantalla
          const nuevasMisiones = informacion.filter((p) => p.id !== mision.id);
          setInformacion(nuevasMisiones);

          // Obtener todos los usuarios para limpiar la misión de sus historiales
          return ServicioUsuarios.getAll();
        })
        .then((respuestaUsuarios) => {
          const usuarios = respuestaUsuarios.data || [];
          // Crear un array de promesas para eliminar la misión de cada usuario
          const promesas = usuarios.map((usr) => {
            const { [mision.id]: _, ...nuevoHistorial } = usr.historial || {};
            return ServicioUsuarios.parchear(usr.id, { historial: nuevoHistorial });
          });
          // Ejecutar todas las actualizaciones
          return Promise.all(promesas);
        })
        .then(() => {
          return ServicioUsuarios.get(user.id);
        })
        .then((refrescado) => {
          setUser(refrescado.data);
          Swal.fire(
            "¡Eliminado!",
            "La misión ha sido eliminada correctamente.",
            "success"
          );
        })
        .catch((error) => {
          console.error(error);
          Swal.fire('ERROR, no se ha podido borrar la misión correctamente' );
        });
    }
  });
};

export default eliminarMision;