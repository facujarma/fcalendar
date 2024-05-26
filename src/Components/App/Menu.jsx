import AddEventForm from "./AddEventForm";
import AñadirCategoria from "./AñadirCategoria";

import { useContext } from "react";
import { UserContext } from "../../App";

import CategoriesList from "./CategoriesList";
import AsideMenu from "./AsideMenu";
function Menu() {
  const { user } = useContext(UserContext);

  return (
    <aside className="relative flex flex-col w-full max-h-full h-content p-4 bg-[#212121]">
      <AsideMenu user={user} />

      <div className="hidden w-full h-[1px] my-4 bg-slate-400 md:block"></div>

      <CategoriesList />

      <ul className="flex flex-col w-full py-2 gap-4">
        <AddEventForm />
        <AñadirCategoria />
        <footer className="hidden md:block">
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
