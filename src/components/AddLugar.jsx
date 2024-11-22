import React from 'react';
import FormLugar from './FormLugar'; // Importa el componente reutilizable
import { addLugar } from '../services/api'; // Función para agregar un lugar

const AddLugar = () => {
  const handleAddLugar = async (formData) => {
    try {
      await addLugar(formData); // Llama a la función para agregar un nuevo lugar
    } catch (error) {
      console.error('Error al agregar el lugar:', error);
    }
  };

  return (
    <FormLugar 
      isEdit={false} 
      initialData={{ nombre: '', ubicacion: '', descripcion: '', imagen: '' }} 
      onSubmit={handleAddLugar} 
    />
  );
};

export default AddLugar;
