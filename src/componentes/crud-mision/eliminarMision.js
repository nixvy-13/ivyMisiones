import ServicioInformacion from "../../servicios/axios/ServicioInformacion";
import Swal from 'sweetalert2';

const eliminarProducto = (producto, informacion, setInformacion) => {
//Saca un alert que pide una confirmacion y hace un .then, si la confirmacion es positiva procede con el borrado a no ser
//que haya un fallo dentro del borrado per se
    Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result)=>{
        if(result.isConfirmed){
            ServicioInformacion.delete(producto.id)
            //Si hay result positivo entonces llama al servicio de borrar un elemento concreto por ID
            .then(()=>{
                Swal.fire('Producto borrado con exito')
                //Crea un nuevo json filtrado en el que se meten todos los elementos anteriores menos el que queriamos borrar
                //es decir el que se le pasa por parametro a la funcion y luego lo settea para actualizar "informacion"
                const nuevosProductos = informacion.filter((p)=> p.id !== producto.id)
                setInformacion(nuevosProductos)
                Swal.fire(
                    "¡Eliminado!",
                    "El elemento ha sido eliminado.",
                    "success"
                )
            }).catch(()=>{
                Swal.fire('ERROR, no se ha podido borrar la aficion correctamente')
            })
        }
      })
}

export default eliminarMision