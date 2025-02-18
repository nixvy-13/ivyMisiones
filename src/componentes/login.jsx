import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../login/AuthProvider'
import bcrypt from 'bcryptjs'
import ServicioUsuarios from '../servicios/axios/ServicioUsuarios';

const Login = () => {
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

          const esCorrecta = bcrypt.compareSync(password,hashUsuario)

          if(esCorrecta){
            login(response.data[0].nombre);
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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
