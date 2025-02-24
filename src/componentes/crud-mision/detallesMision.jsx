function MisionesDetalles({informacion}) {
    return(
        <li className="carrito-productos">
              <h4>Carrito</h4>
              {informacion.length > 0 ? (
                <ul className="lista-productos">
                  {informacion.map((mision, index) => (
                    <li key={index} className="producto-item">
                      <span>{mision.titulo}</span>
                      <span>{mision.descripcion}</span>
                      <span>{mision.dificultad}</span>
                      <span>{mision.xp}</span>                   
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay misiones hechas.</p>
              )}
            </li>
    )
}

export default MisionesDetalles;