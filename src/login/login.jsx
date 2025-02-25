import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider'
import bcrypt from 'bcryptjs'
import ServicioUsuarios from '../servicios/axios/ServicioUsuarios';
import '../estilos/login.css'

const Login = ({
  recordarSesion,
  setRecordarSesion,
  permitirNotificaciones,
  setPermitirNotificaciones,
}) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const cifrarPassword = () =>{
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password,salt)

    console.log(hash)
    return hash
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    ServicioUsuarios.login(usuario)
      .then((response) => {
        if (response.data.length !== 0) {
          const usuario = response.data[0]
          const hashUsuario = usuario.password
          console.log(usuario.administrador);

          const esCorrecta = bcrypt.compareSync(password,hashUsuario)

          if(esCorrecta){
            if(!permitirNotificaciones)
              alert("Cuidado, voy a usar Storage")
            login(response.data[0], usuario.administrador);
            navigate('/');
          }else { 
            setError('Usuario incorrecto')
          }
        } else {
          setError("Usuario no es correcto");
        }
      })
      .catch((error) => {
        alert(error);
        navigate('/login');
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuario</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="recordarSesion">Recordar sesión</label>
          <input
            id="recordarSesion"
            type="checkbox"
            checked={recordarSesion}
            onChange={(e) => setRecordarSesion(e.target.checked)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="permitirNotificaciones">Permitir notificaciones</label>
          <input
            id="permitirNotificaciones"
            type="checkbox"
            checked={permitirNotificaciones}
            onChange={(e) => setPermitirNotificaciones(e.target.checked)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
