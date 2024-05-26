import { useEffect, useState, useContext } from "react";
import DayContent from "./DayContent";
import { CalendarContext } from "../../Pages/HomePage";
import Plus from "../../assets/svg/Plus";

function CalendarDay({ index, day, ID, active = true, isToday }) {
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
        "relative w-full h-full p-1 border-b border-r border-[#434343] text-xs " +
        (active ? "opacity-100" : "opacity-50")
      }
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <span
        className={
          "grid place-content-center w-3 h-3 text-xs rounded-full duration-200 lg:h-5 lg:w-5  " +
          (isHover
            ? "bg-red-500 text-white"
            : active
            ? "text-white"
            : "text-gray-600") +
          (isToday ? " bg-blue-400" : "")
        }
      >
        {day}
      </span>

      {hasEvents ? <DayContent events={calendarInformation[ID]} /> : null}
    </li>
  );
}

export default CalendarDay;
