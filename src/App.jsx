import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './layouts/Layout';
import EditarCliente from './paginas/EditarCliente';
import Inicio from './paginas/Inicio';
import NuevoCliente from './paginas/NuevoCliente';
import VerCliente from './paginas/VerCliente';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="clientes" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="nuevo" element={<NuevoCliente />} />
          <Route path="editar/:id" element={<EditarCliente />} />
          <Route path=":id" element={<VerCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
