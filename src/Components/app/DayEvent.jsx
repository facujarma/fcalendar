import { useContext } from "react";
import { EventSelectedContext, CategoriesContext } from "../Pages/HomePage";

function DayEvent({ event }) {
  const { categories } = useContext(CategoriesContext);
  const { setEventSelected } = useContext(EventSelectedContext);

  const handleClick = () => {
    setEventSelected(event);
  };

  function changeVisibility() {
    for (const tag in event.tags) {
      if (!categories[event.tags[tag]]?.active) {
        return false;
      }
    }
    return true;
  }

  function isFocused() {
    for (const tag in event.tags) {
      if (categories[event.tags[tag]]?.focused) {
        return true;
      }
    }
    return false;
  }

  event.visibility = changeVisibility();
  let Focus = isFocused();
  return (
    <li className="w-full h-4">
      <span
        style={{
          backgroundColor: event.properties.BackgroundColor.value,
          color: event.properties.TextColor.value,
        }}
        className={
          "block w-full h-full px-1 rounded-sm text-white text-[10px]  line-clamp-1 cursor-pointer " +
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
