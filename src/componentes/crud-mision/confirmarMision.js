import { calcularExpNecesaria} from "../../herramientas/experiencia";
import ServicioUsuarios from "../../servicios/axios/ServicioUsuarios";
import Swal from "sweetalert2";

const confirmarMision = (mision, usuario) => {
    console.log(usuario.xp)
    //ACTUALIZAR LA EXPERIENCIA QUE TIENE EL USUARIO
    ServicioUsuarios.parchear(usuario.id, { xp: (usuario.xp+mision.xp) })
  .then(response => {
    console.log("Experiencia actualizada", response.data);
  })
  .catch(error => {
    console.error("Error al actualizar la experiencia:", error);
  });

  //ACTUALIZAR EL HISTORIAL DEL USUARIO
  ServicioUsuarios.parchear(usuario.id, { 
    historial: {
      ...usuario.historial, // Mantiene las entradas previas en el historial
      [new Date().toISOString()]: { 
        mision: mision.id,
      }
    }
  })
  .then(response => {
    console.log("Historial actualizado", response.data);
  })
  .catch(error => {
    console.error("Error al actualizar el historial:", error);
  });
  //FALTA  
  //Si la exp que tiene supera la necesaria segun su nivel para subir un nivel entonces tambien se hace un patch del nivel
}
export default confirmarMision