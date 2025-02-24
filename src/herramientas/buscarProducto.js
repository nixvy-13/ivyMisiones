//*********************************************************************************/
// Buscar un producto, en el array informacion facilitado
//*********************************************************************************/
export function buscarObjeto(informacion, nombre) {
    return informacion.find(objeto => objeto.nombre.toLowerCase() === nombre.toLowerCase()) || null;
  }
  
  
  //*********************************************************************************/
  // Incrementar la cantidad de un producto, en el array informacion facilitado
  //*********************************************************************************/
  export function incrementarCantidad(informacion , nombre) {  
    
    return informacion.map(objeto => {
      if (objeto.nombre.toLowerCase() === nombre.toLowerCase()) {
        return { ...objeto, cantidad: objeto.cantidad + 1 }; 
      }
      return { ...objeto }; 
    });
  }
  
  export function incrementarCantidadEspecifica(informacion , nombre, cantidad) {  
    
    return informacion.map(o => {
      if (o.nombre.toLowerCase() === nombre.toLowerCase()) {
          return { ...o, cantidad: o.cantidad + cantidad };
      }
      return o;
  });
  }
  
  export function calcularUnidades(objetos){
  
    let unidades = 0 ;
  
    objetos.forEach(objeto => {
  
      unidades+=objetos.cantidad
      
    });
  
    return unidades
  
  }
  
  
  
  