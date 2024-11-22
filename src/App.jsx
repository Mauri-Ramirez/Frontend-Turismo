import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddLugar from './components/AddLugar';
import ListaLugares from './components/ListaLugares';
import EditarLugar from './components/EditarLugar';
import DetalleLugar from './components/DetalleLugar';



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ListaLugares />} />
      <Route path="/agregar" element={<AddLugar />} />
      <Route path="/editar/:id" element={<EditarLugar />} />
      <Route path='/detalle/:id' element={<DetalleLugar />}/>
    </Routes>
  );
};

export default App;
