import React from "react";
import RegisterForm from "./registerForm";
import Logo from "../images/logo.js";

const LoginPage = () => {
    return(
        <div className="grid md:grid-cols-2 content-center py-12 gap-y-4">
          <div className="grid md:justify-items-center grid-rows-2 grid-flow-col md:grid-rows-none md:grid-flow-row w-fit md:w-auto">
            <h1 className="l-font-brown text-5xl font-black tracking-widest order-2 md:order-1">Levint</h1>
            <div className="w-auto order-1 row-span-2 md:row-span-1 md:order-2 justify-self-end md:justify-self-auto">
              <Logo/>
            </div>
            <span className="font-bold order-3">Lelang online barang antik dengan mudah</span>
          </div>
          <div className="grid justify-items-center">
            <RegisterForm/>
          </div>
        </div>
    );
}

export default LoginPage;