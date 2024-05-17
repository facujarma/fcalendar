import AddEventForm from "./AddEventForm";
import AñadirCategoria from "./AñadirCategoria";
import RegisterForm from "./RegisterForm";
import { useContext } from "react";
import { UserContext } from "../App";
import Congratulations from "./Congratulations";
import LogOut from "./LogOut";
import LoginForm from "./LoginForm";
import CategoriesList from "./CategoriesList";
function Menu() {
  const { user } = useContext(UserContext);

  return (
    <aside className="relative w-full h-full h-content bg-[#212121] p-4 flex flex-col ">
      {user ? (
        <div className="flex flex-col gap-4">
          <Congratulations email={user.email} />
          <LogOut />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-white text-xl">Estas como Anonimo</h3>
            <p className="text-slate-500 text-xs">
              Tus eventos se guardaran de forma local. Si necesitas que se
              guarden en la nube, inicia sesión:{" "}
            </p>
          </div>

          <LoginForm />
          <RegisterForm />
        </div>
      )}

      <div className="w-full h-[1px] bg-slate-400 my-4"></div>

      <CategoriesList />

      <ul className="md:absolute w-full flex flex-col gap-4 bottom-0 right-0 p-2">
        <AddEventForm />
        <AñadirCategoria />
      </ul>
    </aside>
  );
}

export default Menu;
