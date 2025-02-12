import { useState } from 'react'
import './App.css'
import MenuSuperior from './componentes/MenuSuperior'
import {Routes, Route } from 'react-router-dom';
import Inicio from './componentes/Inicio';
import Pagina404 from './componentes/Pagina404';  

function App() {
  const [exp, setExp] = useState(0)
  const [nivel, setNivel] = useState(1)

  return (
    <div className="App">
      <MenuSuperior
        exp={exp}
        nivel={nivel}
      />
      <main>
        {/* Contenido principal aquí */}
        <Routes>
          
          <Route path='/' element={<Inicio/>} />

          <Route path="*" element={<Pagina404 />} />
        
        </Routes>
      </main>
    </div>
  )
}

export default App
