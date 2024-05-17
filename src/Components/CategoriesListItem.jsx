import { useState, useContext, useEffect } from "react";
import VisibilityHidden from "./svg/VisibilityHidden";
import VisibilityActive from "./svg/VisibilityActive";
import { CategoriesContext } from "../App";
import { setUserCategories } from "../Firebase/DocumentsManager";

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

  return (
    <li
      key={category}
      className="h-6 px-2 text-[#CCC] text-sm border-b border-[#303030] cursor-pointer flex justify-between items-center"
    >
      {category}

      <ul className="flex gap-1">
        <li onClick={handleActive}>
          {active ? <VisibilityActive w="20" /> : <VisibilityHidden w="20" />}
        </li>
        <li onClick={handleFocus}>
          {focused ? <VisibilityActive w="20" /> : <VisibilityHidden w="20" />}
        </li>
      </ul>
    </li>
  );
}

export default CategoriesListItem;
