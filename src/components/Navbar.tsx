import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import Sidebar from "./Sidebar";

export default function Navbar() {
  let navigate = useNavigate();

  return (
    <>
      <div className="fixed bg-orange w-screen z-2">
        <Sidebar />
        <img
          src={logo}
          className="mx-auto lg:w-3/12 md:h-28 lg:h-30 xs:w-6/12 xs:h-70"
        />
        {/* <div className="flex ">
          <Button icon="pi pi-plus" onClick={openCart} className=""></Button>
          <div>{cartQuantity}</div>
        </div> */}
      </div>
    </>
  );
}
