import http from "./http-axios.js";

class ServicioMisiones {
   getAll() {
     return http.get("/infoMisiones");
   }  

   getPorNombre(nombre) {
    return http.get(`/infoMisiones?nombre=${nombre}`);
  } 

  getPorXp(xpMinima) {
    return http.get(`/infoMisiones?xp_gte=${xpMinima}`);
  }

  getPorDificultad(dificultad) {
    return http.get(`/infoMisiones?dificultad=${dificultad}`);
  }

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
