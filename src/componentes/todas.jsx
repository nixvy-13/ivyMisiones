import React, {useState, useEffect} from 'react';
import '../estilos/inicio.css';
import ServicioMisiones from '../servicios/axios/ServicioMisiones';
import { useAuth } from '../login/AuthProvider';

function Todas(){
  const {user} = useAuth();
  const [misiones, setMisiones] = useState([]);

  useEffect(() => {
    const cargarMisiones = async () => {
      if (user.historial) {
        try {
          const misionesPromesas = Object.entries(user.historial).map(async ([misionId, vecesCompletada]) => {
            const response = await ServicioMisiones.get(misionId); // Asumiendo que tiene un método get
            return {
              ...response.data,
              vecesCompletada
            };
          });
          const misionesData = await Promise.all(misionesPromesas);
          setMisiones(misionesData);
        } catch (error) {
          console.error('Error al cargar las misiones:', error);
        }
      }
    };

    cargarMisiones();
  }, [user]);

function completarVariasMisionesTrampa(mision){

}

function quitarMisionTrampas(mision){

}

function completarMisionTrampas(mision){
    
}

return (
    <>
{/* Update the card structure */}
<div className="card-container">
{misiones.length > 0 ? 
  (misiones.map((mision, index) => (
    <div className="card" key={index}>
      <h3>{mision.titulo}</h3>
      <div className="xp">XP: {mision.xp}</div>
      <div className="description">{mision.descripcion}</div>
      <div className="actions">
        <div className="top-buttons">
          <button onClick={() => completarVariasMisionesTrampa(mision)}>Agregar Muchas</button>
          <button onClick={() => quitarMisionTrampas(mision)}>Eliminar</button>
        </div>
        <button className="complete" onClick={() => completarMisionTrampas(mision)}>
          Completar Misión
        </button>
      </div>
    </div>
  ))):(
    <p>No hay misiones hechas.</p>
  )}
</div>
    </>
  
  );
}

export default Todas;