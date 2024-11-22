import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const validateImageURL = (url) => {
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.webp)$/i;
  return allowedExtensions.test(url);
};

const FormLugar = ({ isEdit, initialData = {}, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(initialData.imagen || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'imagen') setPreview(value);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    if (!formData.ubicacion.trim()) newErrors.ubicacion = 'La ubicación es obligatoria.';
    if (!formData.descripcion.trim()) newErrors.descripcion = 'La descripción es obligatoria.';
    if (!formData.imagen.trim()) {
      newErrors.imagen = 'La URL de la imagen es obligatoria.';
    } else if (!validateImageURL(formData.imagen)) {
      newErrors.imagen = 'La imagen debe tener una extensión válida (.jpg, .jpeg, .png, .webp).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await onSubmit(formData);
        navigate('/'); // Redirige al inicio
      } catch (error) {
        console.error('Error al guardar el lugar:', error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {isEdit ? 'Editar Lugar' : 'Agregar Nuevo Lugar'}
        </h2>

        {/* Nombre */}
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded ${
              errors.nombre ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
        </div>

        {/* Ubicación */}
        <div className="mb-4">
          <label htmlFor="ubicacion" className="block text-gray-700 font-medium mb-2">
            Ubicación
          </label>
          <input
            type="text"
            id="ubicacion"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded ${
              errors.ubicacion ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.ubicacion && <p className="text-red-500 text-sm">{errors.ubicacion}</p>}
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-gray-700 font-medium mb-2">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="3"
            className={`w-full px-4 py-2 border rounded ${
              errors.descripcion ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion}</p>}
        </div>

        {/* Imagen */}
        <div className="mb-6">
          <label htmlFor="imagen" className="block text-gray-700 font-medium mb-2">
            URL de la Imagen
          </label>
          <input
            type="text"
            id="imagen"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded ${
              errors.imagen ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.imagen && <p className="text-red-500 text-sm">{errors.imagen}</p>}
          {preview && (
            <div className="mt-4">
              <p className="text-gray-500 mb-2">Previsualización:</p>
              <img
                src={preview}
                alt="Previsualización"
                className="w-full h-auto rounded border"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {isEdit ? 'Guardar Cambios' : 'Agregar Lugar'}
        </button>
      </form>
    </div>
  );
};

export default FormLugar;
