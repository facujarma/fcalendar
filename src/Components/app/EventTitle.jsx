import React, { useContext, useState, useRef, useEffect } from "react";
import { CalendarContext } from "../Pages/HomePage";
import { MdOutlineModeEdit } from "react-icons/md";
import { setUserEvents } from "../../Firebase/DocumentsManager";

function EventTitle({ eventSelected }) {
  const { setCalendarInformation, calendarInformation } =
    useContext(CalendarContext);
  const [editing, setEditing] = useState(false);
  const h3Ref = useRef(null);

  const handleClick = () => {
    setEditing(!editing);
  };

  useEffect(() => {
    if (editing && h3Ref.current) {
      h3Ref.current.focus();
    }
  }, [editing]);

  const handleBlur = () => {
    setEditing(false);
    eventSelected.title = h3Ref.current.innerText;
    setCalendarInformation({ ...calendarInformation });
    setUserEvents({ ...calendarInformation });
  };

  return (
    <>
      <h3
        ref={h3Ref}
        className="flex flex-col gap-1 text-[#ABABAB] text-2xl"
        contentEditable={editing}
        suppressContentEditableWarning={true}
        onBlur={handleBlur}
      >
        {eventSelected == null ? "Selecciona un Evento" : eventSelected.title}
      </h3>
      {eventSelected && (
        <button onClick={handleClick}>
          <MdOutlineModeEdit className="text-2xl text-[#ABABAB]" />
        </button>
      )}
    </>
  );
}

export default EventTitle;
