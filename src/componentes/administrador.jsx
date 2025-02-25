import { useAuth } from "../login/AuthProvider";

const Administrador = () => {
  const { user, administrador } = useAuth();  
  console.log(user);
  return (
    <div>
      {administrador === true ? <p>Hola {user.nombre}</p> : <p>Acceso denegado</p>}
    </div>
  );
};

export default Administrador;