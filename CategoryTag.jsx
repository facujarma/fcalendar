import { useState } from "react";

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
    setUserEvents(calendarInformation);
  };

  return (
    <li
      style={
        categories[tagname]
          ? { backgroundColor: categories[tagname] }
          : { backgroundColor: "#444444" }
      }
      className="h-5 px-2 text-white rounded-full text-xs grid place-content-center relative whitespace-nowrap"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {tagname}
      <button
        className={
          "w-5 h-5 bg-red-500 absolute -top-4 right-1/2 translate-x-1/2 text-white z-10 rounded-full grid place-content-center shadow-lg shadow-black duration-300" +
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
