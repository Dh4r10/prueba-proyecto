import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// VISTAS
// Modulo seguridad
import IniciarSesion from "./modules/Seguridad/pages/IniciarSesion";
import RestablecerContrasenia from "./modules/Seguridad/pages/RestablecerContrasenia";
import ActualizarContrasenia from "./modules/Seguridad/pages/ActualizarContrasenia";
import PerfilUsuario from "./modules/Seguridad/pages/PerfilUsuario";
import PanelAdministrador from "./modules/Seguridad/pages/PanelAdministrador";
import ListaUsuarios from "./modules/Seguridad/pages/ListaUsuarios";
import InformacionUsuario from "./modules/Seguridad/pages/InformacionUsuario";
import CrearUsuario from "./modules/Seguridad/pages/CrearUsuario";

import PrivateRoutes from "./modules/Seguridad/utils/PrivateRoutes";

// Modulo datos alumno
import MenuPrincipal from "./modules/DatosAlumno/MenuPrincipal";

function App() {
  return (
    <div className="h-screen">
      <Routes>
        <Route element={<IniciarSesion />} path="/login" />
        <Route element={<RestablecerContrasenia />} path="/login/restore" />
        <Route
          element={<ActualizarContrasenia />}
          path="/login/restore/update-password"
        />
        {/* <Route element={<PrivateRoutes />}> */}
        <Route element={<MenuPrincipal />} path="/" />
        <Route element={<PerfilUsuario />} path="/perfil" />
        <Route element={<PanelAdministrador />} path="/panelAdministrador" />
        <Route
          element={<ListaUsuarios />}
          path="/panelAdministrador/ListaUsuarios"
        />
        <Route
          element={<InformacionUsuario />}
          path="/panelAdministrador/ListaUsuarios/:id"
        />
        <Route
          element={<CrearUsuario />}
          path="/panelAdministrador/CrearUsuario"
        />
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
