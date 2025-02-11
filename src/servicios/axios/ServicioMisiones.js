import http from "./http-axios.js";

class ServicioMisiones {
   getAll() {
     return http.get("/infoMisiones");
   }  

   getPorNombre(nombre) {
    return http.get(`/infoMisiones?nombre=${nombre}`);
  } 

  /*getPorPrecio(precioMenor,precioSuperior){
    let url= "/informacion?"
    if (precioMenor){
      url+=`precio_gt=${precioMenor}`
    }
    if (precioSuperior){
      url+=`&precio_lt=${precioSuperior}`
    }
    return http.get(url);
  }*/

  get(id) {
    return http.get(`/infoMisiones/${id}`);
  } 

  delete(id) {  
    return http.delete(`/infoMisiones/${id}`);
  }

  update(id, data) {
    console.log(id,data)
    return http.put(`/infoMisiones/${id}`, data);
  }

  create(data) {
    return http.post("/infoMisiones", data);
  }
}

export default new ServicioMisiones();
