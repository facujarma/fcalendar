import AddEventForm from "./AddEventForm";
import AñadirCategoria from "./AñadirCategoria";

function Menu() {
  return (
    <aside className="w-full h-full bg-[#212121]">
      <ul className="flex flex-col gap-4 mt-10 p-4">
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
