import AddEventForm from "./AddEventForm";
import AñadirCategoria from "./AñadirCategoria";

import { useContext } from "react";
import { UserContext } from "../../App";
import Account from "./Account";
import LogOut from "./LogOut";
import CategoriesList from "./CategoriesList";
import Config from "../svg/Config";
function Menu() {
  const { user } = useContext(UserContext);

  return (
    <aside className="relative w-full h-full h-content bg-[#212121] p-4 flex flex-col ">
      <div className="flex flex-col gap-4">
        <Account email={user.email} />
        <div className="h-8 w-full rounded-md border border-[#353535] flex px-3 items-center gap-2.5 text-sm text-[#ABABAB] cursor-pointer">
          <Config /> Configuración de la cuenta
        </div>
        <LogOut />
      </div>

      <div className="w-full h-[1px] bg-slate-400 my-4"></div>

      <CategoriesList />

      <ul className="md:absolute w-full flex flex-col gap-4 bottom-0 right-0 p-4">
        <AddEventForm />
        <AñadirCategoria />
        <footer>
          <p className="text-slate-400 text-xs whitespace-nowrap">
            © 2024. Todos los derechos reservados <br />{" "}
            <a href="https://f-calendar.vercel.app">f-calendar.vercel.app</a>
          </p>
        </footer>
      </ul>
    </aside>
  );
}

export default Menu;
