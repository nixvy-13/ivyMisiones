import { calcularExpNecesaria} from "../../herramientas/experiencia";
import ServicioUsuarios from "../../servicios/axios/ServicioUsuarios";
import { buscarMision } from "../../herramientas/misiones";
import Swal from "sweetalert2";

const confirmarMision = (mision, usuario) => {
    console.log("invocando a confirmarMision");
    
    // Primero obtenemos el usuario actual para tener el historial más reciente
    ServicioUsuarios.get(usuario.id)
        .then(response => {
            const usuarioActual = response.data;
            
            // Actualizamos la experiencia
            ServicioUsuarios.parchear(usuario.id, { xp: (usuarioActual.xp + mision.xp) })
                .catch(error => {
                    console.error("Error al actualizar la experiencia:", error);
                });

            // Actualizamos el historial
            const historialActual = usuarioActual.historial || {};
            const cantidadActual = historialActual[mision.id] || 0;
            
            const nuevoHistorial = {
                ...historialActual,
                [mision.id]: cantidadActual + 1
            };

            ServicioUsuarios.parchear(usuario.id, { historial: nuevoHistorial })
                .then(() => {
                    Swal.fire({
                        title: '¡Misión completada!',
                        text: `Has ganado ${mision.xp} puntos de experiencia`,
                        icon: 'success'
                    });
                })
                .catch(error => {
                    console.error("Error al actualizar historial:", error);
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo actualizar el historial',
                        icon: 'error'
                    });
                });
        })
        .catch(error => {
            console.error("Error al obtener usuario:", error);
        });
};

export default confirmarMision