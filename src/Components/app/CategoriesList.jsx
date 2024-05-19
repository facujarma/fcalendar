import { useContext, useState } from "react";
import { CategoriesContext } from "../Pages/HomePage";
import CategoriesListItem from "./CategoriesListItem";
import Expand from "../../assets/svg/Expand";

function CategoriesList() {
  const [open, setOpen] = useState(false);
  const { categories } = useContext(CategoriesContext);

  return (
    <div className="w-full h-content cursor-pointer">
      <div
        className="flex gap-1 w-full items-center"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <Expand styles={{ marginBottom: "5px" }} w="12" />
        ) : (
          <Expand
            styles={{ transform: "rotateZ(-90deg)", marginBottom: "5px" }}
            w="12"
          />
        )}

        <h3 className="text-[#D1D1D1] text-xl mb-2">Categorías:</h3>
      </div>

      {open ? (
        <ul className="flex flex-col gap-1 w-full overflow-y-auto h-72">
          {Object.keys(categories).map((category) => (
            <CategoriesListItem category={category} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default CategoriesList;
