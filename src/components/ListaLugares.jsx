import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLugares, deleteLugar } from '../services/api';

const ListaLugares = () => {
  const [lugares, setLugares] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [lugaresFiltrados, setLugaresFiltrados] = useState([]);

  useEffect(() => {
    const fetchLugares = async () => {
      try {
        const data = await getLugares();
        setLugares(data);
        setLugaresFiltrados(data);
      } catch (error) {
        console.error('Error al obtener los lugares', error);
      }
    };
    fetchLugares();
  }, []);

  useEffect(() => {
    if (!busqueda) {
      setLugaresFiltrados(lugares);
    } else {
      const filtrados = lugares.filter((lugar) =>
        lugar.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        lugar.ubicacion.toLowerCase().includes(busqueda.toLowerCase())
      );
      setLugaresFiltrados(filtrados);
    }
  }, [busqueda, lugares]);

  const handleDelete = async (id) => {
    try {
      await deleteLugar(id);
      setLugares((prevLugares) => prevLugares.filter((lugar) => lugar.id !== id));
    } catch (error) {
      console.error('Error al eliminar el lugar', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Lugares Turísticos</h1>

      <div className="flex justify-center mb-4">
        <Link to="/agregar">
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700">
            Agregar Nuevo Lugar
          </button>
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre o ubicación..."
          className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {lugaresFiltrados && lugaresFiltrados.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lugaresFiltrados.map((lugar) => (
            <li key={lugar.id} className="bg-white shadow-md rounded p-4">
              <h3 className="text-xl font-semibold mb-2">{lugar.nombre}</h3>
              <p className="text-gray-600">Ubicación: {lugar.ubicacion}</p>
              {lugar.imagen && (
                <img
                  src={lugar.imagen}
                  alt={lugar.nombre}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <div className="flex justify-between items-center">
                <Link to={`/detalle/${lugar.id}`}>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700">
                    Más Info
                  </button>
                </Link>
                <Link to={`/editar/${lugar.id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Editar
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(lugar.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No se encontraron lugares.</p>
      )}
    </div>
  );
};

export default ListaLugares;
