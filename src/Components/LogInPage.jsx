import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LOGIN_REGISTER/LoginForm";
import RegisterForm from "./LOGIN_REGISTER/RegisterForm";
import { UserContext } from "../App";

function LoginPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="bg-[#212121] min-h-screen w-screen pt-10 flex flex-col gap-10">
      <header className="flex flex-col gap-4">
        <h1 className="max-w-md text-white text-center text-2xl mx-auto">
          Inicia sesión o Regístrate para empezar.
        </h1>
        <p className="text-[#8A8A8A] text-xs text-center mx-auto max-w-xs">
          Comienza por crear una cuenta si es que no tienes, o por ingresar con
          tu email y contraseña.
        </p>
      </header>

      <main className="flex flex-col gap-4">
        <div className="w-full flex flex-col md:flex-row justify-between gap-2 px-2">
          <button
            className={
              "w-80 mx-auto h-10 rounded-full duration-300 " +
              (isLogin
                ? "bg-[#D9D9D9]"
                : "border border-[#D9D9D9] text-[#919191]")
            }
            onClick={() => setIsLogin(true)}
            type="button"
          >
            Ya tengo una cuenta
          </button>
            <span className="text-[#CCC] text-lg text-center">o</span>
          <button
            className={
              "w-80 mx-auto h-10 rounded-full duration-300 " +
              (isLogin
                ? "border border-[#D9D9D9] text-[#919191]"
                : "bg-[#D9D9D9]")
            }
            onClick={() => setIsLogin(false)}
            type="button"
          >
            Crear una cuenta
          </button>
        </div>

        <div className="w-80 mx-auto flex flex-col gap-2 mt-8">
          <h3 className="text-[#D9D9D9] text-xl"> {isLogin ? "Iniciar sesión" : "Registrate"} </h3>
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
