import ServicioUsuarios from "../../servicios/axios/ServicioUsuarios";
import Swal from "sweetalert2";

const confirmarMision = (mision, user, setUser) => {
  ServicioUsuarios.get(user.id)
    .then(response => {
      const usuarioActual = response.data;
      // Actualiza el XP y el historial en la BD
      ServicioUsuarios.parchear(user.id, { xp: usuarioActual.xp + mision.xp })
        .then(() => {
          const nuevoHistorial = {
            ...usuarioActual.historial,
            [mision.id]: (usuarioActual.historial?.[mision.id] || 0) + 1
          };
          return ServicioUsuarios.parchear(user.id, { historial: nuevoHistorial });
        })
        .then(() => {
          // Ahora sí: vuelve a obtener el usuario y actualiza AuthProvider
          return ServicioUsuarios.get(user.id);
        })
        .then(refrescado => {
          setUser(refrescado.data);  // Esto guarda en local storage y actualiza el contexto
          Swal.fire('¡Misión completada!', `Has ganado ${mision.xp} puntos de experiencia`, 'success');
        })
        .catch(err => console.error(err));
    });
};

export default confirmarMision;