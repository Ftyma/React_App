import React, { useState } from "react";

import { Button } from "primereact/button";
import custom from "../css/Sidebar.module.css";

export default function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);

  let menuList = [
    {
      label: "Login",
      icon: `pi pi-fw pi-plus`,
      url: "http://localhost:5173/login",
    },
    {
      label: "Products",
      icon: "pi pi-shopping-bag",
      url: "http://localhost:5173/product",
    },
    { label: "Setting", icon: "pi pi-fw pi-cog" },
    { label: "Logout", icon: "pi pi-fw pi-power-off" },
  ];

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div
        className={`flex flex-col fixed top-0 z-3 ${
          showMenu ? "bg-white" : ""
        }`}
      >
        <Button
          onClick={toggleMenu}
          className={`${custom.sideBarButton} ${
            showMenu ? "bg-white border-none" : ""
          }`}
        >
          <i className={`pi pi-bars ${showMenu ? custom.showBar : ""}`}></i>
        </Button>

        {showMenu && (
          <div className="min-h-screen w-72 bg-white ">
            <div className="card">
              <nav className="">
                <ul onClick={toggleMenu}>
                  <li className="navbar-toggle"></li>
                  {menuList.map((item, i) => {
                    return (
                      <div>
                        <ul key={i} className="flex flex-row ml-3">
                          <i className={`${item.icon} mr-3 pt-1`}></i>
                          <li>{item.label}</li>
                        </ul>
                      </div>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
