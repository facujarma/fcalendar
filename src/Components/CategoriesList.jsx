import { useContext, useState } from "react";
import { CategoriesContext } from "../App";
import CategoriesListItem from "./CategoriesListItem";
import Expand from "./svg/Expand";

function CategoriesList() {
  const [open, setOpen] = useState(false);
  const { categories } = useContext(CategoriesContext);

  return (
    <div className="w-full h-content">
      <div
        className="flex gap-1 w-full items-center"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <Expand styles={{ marginBottom: "5px" }} />
        ) : (
          <Expand
            styles={{ transform: "rotateZ(-90deg)", marginBottom: "5px" }}
          />
        )}
        
        <h3 className="text-[#A1A1A1] text-xl mb-2">Categorías:</h3>
      </div>

      {open ? (
        <ul className="flex flex-col gap-1 w-full">
          {Object.keys(categories).map((category) => (
            <CategoriesListItem category={category} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default CategoriesList;
