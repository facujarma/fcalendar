import { useContext, useEffect, useState } from "react";
import { EventSelectedContext, CategoriesContext } from "../../Pages/HomePage";
import { ShortcutsContext } from "./Calendar";

function DayEvent({ event }) {
  const { categories } = useContext(CategoriesContext);
  const { setEventSelected } = useContext(EventSelectedContext);
  const { shortcuts } = useContext(ShortcutsContext);

  const [properties, setProperties] = useState({
    BackgroundColor: event.properties.BackgroundColor.value,
    TextColor: event.properties.TextColor.value,
  });

  const handleClick = () => {
    setEventSelected(event);
  };

  function changeVisibility() {
    for (const tag of event.tags) {
      if (!categories[tag]?.active) {
        return false;
      }
    }
    return true;
  }

  function isFocused() {
    for (const tag of event.tags) {
      if (categories[tag]?.focused) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    console.log(event);

    const newProperties = {
      BackgroundColor: event.properties.BackgroundColor.value,
      TextColor: event.properties.TextColor.value,
    };
    
    if (shortcuts && event.properties.PriorizePersonal.value === false) {
      const shortcutsArray = Array.isArray(shortcuts) ? shortcuts : Object.values(shortcuts);
      shortcutsArray.sort((a, b) => b.shortcutPriority - a.shortcutPriority);
      console.log(shortcutsArray)
      for (const shortcut of shortcutsArray) {
        for (const tag of event.tags) {
          if (shortcut.name === tag) {
            newProperties.BackgroundColor = shortcut.properties.BackgroundColor;
            newProperties.TextColor = shortcut.properties.TextColor;
          }
        }
      }
    }

    setProperties(newProperties);
  }, [
    shortcuts, 
    event.properties.BackgroundColor.value, 
    event.properties.TextColor.value, 
    event.properties.PriorizePersonal.value, 
    event.tags
  ]);

  event.visibility = changeVisibility();
  const Focus = isFocused();

  return (
    <li className="w-full h-4">
      <span
        style={{
          backgroundColor: properties.BackgroundColor,
          color: properties.TextColor,
        }}
        className={
          "block w-full h-full px-1 rounded-sm text-white text-[10px] line-clamp-1 cursor-pointer " +
          (event.visibility ? "opacity-100 " : "opacity-10 ") +
          (Focus
            ? " outline outline-offset-2 outline-1 outline-white"
            : " outline-0")
        }
        onClick={handleClick}
      >
        {event.title}
      </span>
    </li>
  );
}

export default DayEvent;
