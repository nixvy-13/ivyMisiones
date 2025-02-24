import { useState } from 'react'
import './App.css'
import MenuSuperior from './componentes/MenuSuperior'
import {Routes, Route } from 'react-router-dom';
import Inicio from './componentes/Inicio';
import Pagina404 from './componentes/Pagina404';  
import Login from './componentes/login';
import { AuthProvider, useAuth } from './login/AuthProvider';
import RutasProtegidas from './login/RutasProtegidas'
import Todas from './componentes/todas';

function App() {

  const [nombre, setNombre] = useState("Usuario")
  const [nivel, setNivel] = useState(1)
  const [xp, setXp] = useState(0)

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

          <Route path='/todas' element={
            <RutasProtegidas>
              <Todas/>
            </RutasProtegidas>
            }
          />

          <Route
              path="/login"
              element={<Login/>}
          />

          <Route path="*" element={<Pagina404 />} />
        
        </Routes>
      </main>
    </div>
    </AuthProvider>
  )
}

export default App
