import { useContext } from "react";
import { EventSelectedContext } from "../App";
function DayEvent({ event }) {
  const { setEventSelected } = useContext(EventSelectedContext);

  const handleClick = () => {
    setEventSelected(event);
  };

  return (
    <li className="w-full h-4">
      <span
        style={{ backgroundColor: event.properties.BackgroundColor, color: event.properties.TextColor }}
        className={
          "h-full text-white text-[10px] rounded-sm px-1 w-full block line-clamp-1 cursor-pointer"
        }
        onClick={handleClick}
      >
        {event.title}
      </span>
    </li>
  );
}

export default DayEvent;
