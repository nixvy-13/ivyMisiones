
export function incrementarCantidad(informacion , nombre) {  
  
    return informacion.map(mision => {
      if (mision.nombre.toLowerCase() === mision.toLowerCase()) {
        return { ...mision, cantidad: mision.cantidad + 1 }; 
      }
      return { ...mision }; 
    });
  }

  export function buscarMision(historial, id) {
    return historial.hasOwnProperty(id) ? historial[id]: null;
  }