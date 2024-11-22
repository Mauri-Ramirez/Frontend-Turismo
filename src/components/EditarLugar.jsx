import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormLugar from './FormLugar'; // Importa el componente reutilizable
import { getLugarById, updateLugar } from '../services/api'; // Funciones para obtener y actualizar el lugar

const EditarLugar = () => {
  const { id } = useParams(); // Obtiene el ID del lugar desde la URL
  const [initialData, setInitialData] = useState(null); // Estado para los datos iniciales del formulario

  useEffect(() => {
    const fetchLugar = async () => {
      try {
        const lugar = await getLugarById(id); // Obtiene los datos del lugar por ID
        setInitialData(lugar);
      } catch (error) {
        console.error('Error al cargar los datos del lugar:', error);
      }
    };

    fetchLugar();
  }, [id]);

  const handleUpdateLugar = async (formData) => {
    try {
      await updateLugar(id, formData); // Actualiza el lugar con los nuevos datos
    } catch (error) {
      console.error('Error al actualizar el lugar:', error);
    }
  };

  // Muestra un mensaje de carga mientras los datos iniciales se cargan
  if (!initialData) {
    return <p className="text-center mt-10">Cargando datos...</p>;
  }

  return (
    <FormLugar 
      isEdit={true} 
      initialData={initialData} 
      onSubmit={handleUpdateLugar} 
    />
  );
};

export default EditarLugar;
