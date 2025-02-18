import http from "./http-axios.js";

class ServicioUsuarios {
   getAll() {
     return http.get("/usuarios");
   }  

   login(usuario) {
    return http.get(`/usuarios?nombre=${usuario}`);
    //http://localhost:3000/usuarios?nombre=agustin&pass=123
 }

   getPorNombre(nombre) {
    return http.get(`/usuarios?nombre=${nombre}`);
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
    return http.get(`/usuarios/${id}`);
  } 

  delete(id) {  
    return http.delete(`/usuarios/${id}`);
  }

  update(id, data) {
    console.log(id,data)
    return http.put(`/usuarios/${id}`, data);
  }

  create(data) {
    return http.post("/usuarios", data);
  }

  parchear(id, data) {
    return http.patch(`/usuarios/${id}`, data);
  }
}

export default new ServicioUsuarios();
