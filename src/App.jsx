import { useState, useEffect } from 'react'
import './App.css'
import MenuSuperior from './componentes/MenuSuperior'
import {Routes, Route } from 'react-router-dom';
import Inicio from './componentes/Inicio';
import Pagina404 from './componentes/Pagina404';  
import Login from './login/login';
import { AuthProvider, useAuth } from './login/AuthProvider';
import RutasProtegidas from './login/RutasProtegidas'
import Todas from './componentes/todas';
import UseStorageState from './servicios/UseStorageState';
import ServicioObjetos from './servicios/axios/ServicioObjetos';
import ListaImagenes from './componentes/cuerpo';
import DetalleCarrito from './componentes/DetalleCarrito';
import LocalStorageServicio from './servicios/storage';
import Administrador from './componentes/administrador';

function App() {

  const [info, setInfo] = useState([])

  const [recordarSesion, setRecordarSesion] = UseStorageState(
    "recordarSesion",
    false
  );
  const [permitirNotificaciones, setPermitirNotificaciones] = UseStorageState(
    "permitirNoficaciones",
    false
  );

  useEffect(() => {
    ServicioObjetos.getAll()
          .then((response) => {
            setInfo(response.data);
          })
          .catch((error) => {
            alert("No se ha podido descargar la información...");
            console.error(error);
          });
  }, []);

  const [nombre, setNombre] = useState("Usuario")
  const [nivel, setNivel] = useState(1)
  const [xp, setXp] = useState(0)
  const [objetos, setObjetos] = UseStorageState("objetos",[]);
  const [total, setTotal] = UseStorageState("total", 0);

  //Si no esta pulsado recordar sesion entonces la quita del local storage. Primero la guarda siempre, luego decide si quedarsela
  if (!recordarSesion) LocalStorageServicio.remove("usuario");

  return (
    <AuthProvider>
      <div className="App">
      <MenuSuperior
      nombre={nombre}
      setNombre={setNombre}
      nivel={nivel}
      setNivel={setNivel}
      xp={xp}
      setXp={setXp}
      objetos={objetos}
      />
      <main>
        {/* Contenido principal aquí */}
        <Routes>

          <Route path='/' element={
            <RutasProtegidas>
              <Inicio/>
            </RutasProtegidas>
            }
          />

          <Route path='/detalles' element={
            <RutasProtegidas>
              <Todas/>
            </RutasProtegidas>
            }
          />

          <Route path='/compra' element={
            <RutasProtegidas>
              <ListaImagenes total={total} setTotal={setTotal} objetos={objetos} setObjetos={setObjetos} info={info} permitirNotificaciones={permitirNotificaciones}/>
            </RutasProtegidas>
            }
          />

          <Route path='/carro' element={
            <RutasProtegidas>
              <DetalleCarrito objetos={objetos} setObjetos={setObjetos} total={total} setTotal={setTotal}/>
            </RutasProtegidas>
            }
          />

            <Route
              path="/administrador"
              element={
                <RutasProtegidas>
                  <Administrador />
                </RutasProtegidas>
              }
            />

          <Route
              path="/login"
              element={<Login
                recordarSesion={recordarSesion}
                setRecordarSesion={setRecordarSesion}
                permitirNotificaciones={permitirNotificaciones}
                setPermitirNotificaciones={setPermitirNotificaciones}
                />}
          />

          <Route path="*" element={<Pagina404 />} />
        
        </Routes>
      </main>
    </div>
    </AuthProvider>
  )
}

export default App
