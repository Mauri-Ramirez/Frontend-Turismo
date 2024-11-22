import axios from 'axios';

const API_URL = 'http://localhost:3000/lugares';

// Función para agregar un lugar
export const addLugar = async (lugar) => {
  const response = await axios.post(API_URL, lugar);
  return response.data;
};

// Función para traer por Id
export const getLugarById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateLugar = async (id, lugar) => {
  await axios.put(`${API_URL}/${id}`, lugar);
};

export const getLugares = async () => {
  return await axios.get(API_URL).then((res) => res.data); 
};

// Función para eliminar un lugar por su ID
export const deleteLugar = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
  };

