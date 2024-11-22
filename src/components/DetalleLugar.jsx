import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getLugarById } from "../services/api";

const DetalleLugar = () => {
  const { id } = useParams();
  const [lugar, setLugar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLugar = async () => {
      try {
        const data = await getLugarById(id);
        setLugar(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el lugar:", error);
        setLoading(false);
      }
    };

    fetchLugar();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando detalles del lugar...</p>;
  }

  if (!lugar) {
    return <p className="text-center text-red-500">No se encontró el lugar.</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <img
          src={lugar.imagen}
          alt={lugar.nombre}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{lugar.nombre}</h1>
        <p className="text-gray-600">
          <strong>Ubicación:</strong> {lugar.ubicacion}
        </p>
        <p className="text-gray-600 my-4">{lugar.descripcion}</p>
        <Link to="/" className="block text-center mt-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Volver
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DetalleLugar;
