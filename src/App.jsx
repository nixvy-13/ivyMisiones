import { useState } from 'react'
import './App.css'
import MenuSuperior from './componentes/MenuSuperior'

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
          
        </Routes>
      </main>
    </div>
  )
}

export default App
