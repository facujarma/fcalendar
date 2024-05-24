import { useState } from "react";
import { setUserEvents } from "../../Firebase/DocumentsManager";

function CategoryTag({
  tagname,
  categories,
  setCalendarInformation,
  calendarInformation,
  eventSelected,
  i,
}) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    eventSelected.tags.splice(i, 1);
    if (eventSelected.tags.length === 0) {
      eventSelected.tags = [];
    }
    setCalendarInformation({ ...calendarInformation });
    setUserEvents({ ...calendarInformation });
  };

  if (!categories[tagname]) {
    handleDelete();
    return null;
  }

  return (
    <li
      style={
        categories[tagname]
          ? { backgroundColor: categories[tagname].color }
          : { backgroundColor: "#444444" }
      }
      className="relative grid place-content-center h-5 px-2 rounded-full text-xs text-white whitespace-nowrap"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {tagname}
      <button
        className={
          "z-10 absolute grid place-content-center w-5 h-5 bg-red-500 rounded-full -top-4 right-1/2 translate-x-1/2 text-white shadow-lg shadow-black duration-300" +
          (open ? " opacity-100" : " opacity-0")
        }
        onClick={handleDelete}
      >
        x
      </button>
    </li>
  );
}

export default CategoryTag;
