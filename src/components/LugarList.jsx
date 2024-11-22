import React, { useEffect, useState } from 'react'; // Importamos React y hooks necesarios
import { getLugares, deleteLugar } from '../services/api'; // Importamos funciones para interactuar con la API

// Componente principal para listar lugares turísticos
const LugarList = () => {
  // Estado para almacenar la lista de lugares
  const [lugares, setLugares] = useState([]);

  // useEffect se ejecuta una vez al cargar el componente
  useEffect(() => {
    const fetchLugares = async () => {
      try {
        const response = await getLugares();
        setLugares(response.data || []);  
      } catch (error) {
        console.error('Error al obtener los lugares', error);
      }
    };
  
    fetchLugares();
  }, []);
  
  // Función para obtener los lugares turísticos desde el backend
  const fetchLugares = async () => {
    try {
      const response = await getLugares();
      console.log('Datos recibidos:', response.data); 
      setLugares(response.data || []);
    } catch (error) {
      console.error('Error al obtener los lugares', error);
    }
  };
  

  // Función para eliminar un lugar turístico
  const handleDelete = async (id) => {
    try {
      
      await deleteLugar(id);
      fetchLugares();
    } catch (error) {
      
      console.error('Error al eliminar el lugar:', error);
    }
  };

  // Renderizamos la lista de lugares
  return (
    <div>
      <h1>Lista de Lugares</h1>
      {lugares.length === 0 ? (
        <p>No hay lugares disponibles</p>
      ) : (
        <ul>
          {lugares.map(lugar => (
            <li key={lugar.id}>
              {lugar.nombre}
              <button onClick={() => handleDelete(lugar.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
};

export default LugarList;
