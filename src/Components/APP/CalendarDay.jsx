import { useEffect, useState, useContext } from "react";
import DayContent from "./DayContent";
import { CalendarContext } from "../HomePage";

function CalendarDay({ index, day, ID, active = true }) {
  const { calendarInformation } = useContext(CalendarContext);

  const [isHover, setIsHover] = useState(false);
  const [hasEvents, setHasEvents] = useState(false);

  useEffect(() => {
    if (calendarInformation) {
      setHasEvents(calendarInformation.hasOwnProperty(ID));
    }
  }, [calendarInformation, ID]);

  return (
    <li
      id={ID}
      key={index}
      className={
        "w-full h-full text-xs border-b border-r border-[#434343] p-1 " +
        (active ? "opacity-100" : "opacity-50")
      }
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <span
        className={
          "block text-xs duration-200 h-3 w-3 lg:h-5 lg:w-5 grid place-content-center rounded-full " +
          (isHover
            ? "bg-red-500 text-white"
            : active
            ? "text-white"
            : "text-gray-600")
        }
      >
        {day}
      </span>

      {hasEvents ? <DayContent events={calendarInformation[ID]} /> : null}
    </li>
  );
}

export default CalendarDay;
