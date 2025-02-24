import http from "./http-axios.js";

class ServicioObjetos {
   getAll() {
     return http.get("/objetos");
   }  

   getPorNombre(nombre) {
    return http.get(`/objetos?nombre=${nombre}`);
  } 

  getPorPrecio(precioMenor,precioSuperior){
    let url= "/objetos?"
    if (precioMenor){
      url+=`precio_gt=${precioMenor}`
    }
    if (precioSuperior){
      url+=`&precio_lt=${precioSuperior}`
    }
    return http.get(url);
  }

  get(id) {
    return http.get(`/objetos/${id}`);
  } 

  delete(id) {  
    return http.delete(`/objetos/${id}`);
  }

  update(id, data) {
    console.log(id,data)
    return http.put(`/objetos/${id}`, data);
  }

  create(data) {
    return http.post("/objetos", data);
  }

  parchear(id, data) {
    return http.patch(`/objetos/${id}`, data);
  }
}

export default new ServicioObjetos();
