import { useState, useContext, useEffect } from "react";
import VisibilityHidden from "../../assets/svg/VisibilityHidden";
import VisibilityActive from "../../assets/svg/VisibilityActive";
import { CategoriesContext } from "../Pages/HomePage";
import { setUserCategories } from "../../Firebase/DocumentsManager";
import Favorito from "../../assets/svg/Favorito";
import { MdOutlineDelete } from "react-icons/md";

function CategoriesListItem({ category }) {
  const { categories, setCategories } = useContext(CategoriesContext);

  const [active, setActive] = useState(true);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setActive(categories[category].active);
    setFocused(categories[category].focused);
  }, [category, categories]);

  const handleActive = () => {
    setActive(!active);
    let a = { ...categories };
    a[category].active = !active;
    setCategories(a);
    setUserCategories(a);
  };

  const handleFocus = () => {
    setFocused(!focused);
    let a = { ...categories };
    a[category].focused = !focused;
    setCategories(a);
    setUserCategories(a);
  };

  const handleDelete = () => {
    let a = { ...categories };
    delete a[category];
    setCategories(a);
    setUserCategories(a);
  };

  return (
    <li
      key={category}
      className="flex justify-between items-center h-6 ml-4 px-2.5 rounded-md text-[#CCC] text-sm cursor-pointer"
    >
      {category}

      <ul className="flex items-center gap-1">
        <li onClick={handleDelete}>
          <MdOutlineDelete className="text-red-500 text-[18px]" />
        </li>
        <li onClick={handleActive}>
          {active ? <VisibilityActive w="20" /> : <VisibilityHidden w="20" />}
        </li>
        <li onClick={handleFocus}>
          {focused ? <Favorito marked={true} /> : <Favorito />}
        </li>
      </ul>
    </li>
  );
}

export default CategoriesListItem;
