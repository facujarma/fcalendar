import { useContext, useState } from "react";
import { CategoriesContext } from "../../Pages/HomePage";
import CategoriesListItem from "./CategoriesListItem";
import Expand from "../../assets/svg/Expand";

function CategoriesList() {
  const [open, setOpen] = useState(false);
  const { categories } = useContext(CategoriesContext);

  return (
    <div className="categories-list flex flex-col w-full h-full">
      <div
        className="flex items-center w-full gap-1 cursor-pointer"
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
        <ul className="categories-list-content flex flex-col w-full gap-1 overflow-y-auto">
          {Object.keys(categories).map((category) => (
            <CategoriesListItem key={category} category={category} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default CategoriesList;
