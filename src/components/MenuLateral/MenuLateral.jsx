import React, { useState } from "react";
import AvantarCN from "@/components/AvatarCN";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EscuadoCiencias from "../../../public/img/escudoCiencias.png";
import {
  faFile,
  faUser,
  faTrashCan,
  faAddressCard,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightFromBracket,
  faClockRotateLeft,
  faCrosshairs,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Menu, ConfigProvider } from "antd";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("PERFIL", "1", <FontAwesomeIcon icon={faUser} />),
  getItem("MENÚ PRINCIPAL", "2", <FontAwesomeIcon icon={faCrosshairs} />, [
    getItem("EDITAR ALUMNO", "21", null, [getItem("PAGAR INSCRIPCION", "211")]),
    getItem("PAGOS", "221"),
  ]),
  getItem("INSCRIBIR ALUMNO", "3", <FontAwesomeIcon icon={faPlus} />),
  getItem("REPORTES", "4", <FontAwesomeIcon icon={faFile} />, [
    getItem("INGRESOS", "41"),
    getItem("DEUDAS", "42"),
    getItem("ALUMNOS ESPECIALES", "43"),
    getItem("PAGOS ANTICIPADOS", "44"),
    getItem("METODO PAGO", "45"),
  ]),
  getItem(
    "HISTORIAL DE PAGOS",
    "5",
    <FontAwesomeIcon icon={faClockRotateLeft} />
  ),
  getItem(
    "PAPELERA DE ESTUDIANTES",
    "6",
    <FontAwesomeIcon icon={faTrashCan} />
  ),
  getItem(
    "PANEL DE ADMINISTRADOR",
    "7",
    <FontAwesomeIcon icon={faAddressCard} />,
    [
      getItem("HISTORIAL REPORTES", "71"),
      getItem("SOLICITUD DE ELIMINACION", "72"),
      getItem("LISTA DE USUARIOS", "73", null, [
        getItem("CREAR USUARIO", "731"),
        getItem("EDITAR USUARIO", "732"),
      ]),
    ]
  ),
  getItem(
    "CERRAR SESION",
    "8",
    <FontAwesomeIcon icon={faArrowRightFromBracket} />,
    null
  ),
];

const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        return func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(items);

const MenuLateral = ({ children }) => {
  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "21"]);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <>
      <nav className="menuLateral w-96 bg-blue-2 overflow-hidden">
        <div className="flex py-2 justify-center items-center bg-gray-300 text-2xl font-bold  tracking-wider text-blue-2">
          <img className="w-14 h-12 mr-3" src={EscuadoCiencias} alt="escudo" />
          <h1>I.E.P "CIENCIAS"</h1>
        </div>
        <div className="h-48 flex justify-center items-center border-b-1 border-white-1">
          <AvantarCN />
        </div>
        <div className="h-screenoverflow-y-auto">
          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: "none",
                // colorBgContainer: "red",
                colorText: "#C1C1C1",
              },
              components: {
                Menu: {
                  activeBarBorderWidth: 0,
                  itemBorderRadius: 0,
                  borderRadiusOuter: 1,
                },
              },
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["2"]}
              openKeys={stateOpenKeys}
              onOpenChange={onOpenChange}
              style={{
                width: "100%",
              }}
              items={items}
            />
          </ConfigProvider>
        </div>
      </nav>

      <div className="bg-blue-1 h-full w-screen overflow-hidden">
        <div className="h-10">cabecera de cada pagina</div>
        <div className="bg-green-300 h-full">{children}</div>
      </div>
    </>
  );
};

export default MenuLateral;
