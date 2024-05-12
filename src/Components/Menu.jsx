import AddEventForm from "./AddEventForm";
import AñadirCategoria from "./AñadirCategoria";
import RegisterForm from "./RegisterForm";
import { useContext } from "react";
import { UserContext } from "../App";
import Congratulations from "./Congratulations";
import LogOut from "./LogOut";
import LoginForm from "./LoginForm";
function Menu() {
  const { user } = useContext(UserContext);

  return (
    <aside className="w-full h-full bg-[#212121] p-4 flex flex-col justify-between">
      {user ? (
        <div className="flex flex-col gap-4">
          <Congratulations email={user.email} />
          <LogOut />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
          <h3 className="text-white text-xl">Estas como Anonimo</h3>
          <p className="text-slate-500 text-xs">Tus eventos se guardaran de forma local. Si necesitas que se guarden en la nube, inicia sesión: </p>
          </div>
          
          <LoginForm />
          <RegisterForm />
        </div>
      )}
      <ul className="flex flex-col gap-4">
        <AddEventForm />
        <AñadirCategoria />
        <li className="w-full h-8 bg-gray-700 rounded-lg text-white grid place-content-center text-xs hover:bg-slate-500 duration-300 cursor-pointer">
          Guardar calendario
        </li>
      </ul>
    </aside>
  );
}

export default Menu;
