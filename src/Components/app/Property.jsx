import { useEffect, useState } from "react";
import { setUserEvents } from "../../Firebase/DocumentsManager";

function Property({
  clave,
  eventSelected,
  setCalendarInformation,
  calendarInformation,
  isRequired = false,
}) {
  const handleDelete = () => {
    if (isRequired) {
      return;
    }
    delete eventSelected.properties[clave];
    setCalendarInformation({ ...calendarInformation });
    setUserEvents(calendarInformation);
  };

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(eventSelected.properties[clave] || "");
  }, [eventSelected]);

  return (
    <li className="w-full flex gap-4 items-center">
      <span className="text-[#dedede] text-sm"> {clave}: </span>
      <input
        type="text"
        placeholder={eventSelected.properties[clave]}
        className="w-full h-6 border border-[#A1A1A1] rounded text-sm bg-[#313131] text-[#A1A1A1] px-2 "
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(newValue);
          eventSelected.properties[clave] = newValue;
          setCalendarInformation({ ...calendarInformation });
          setUserEvents(calendarInformation);
        }}
      />
      {isRequired ? null : (
        <div
          className="h-6 aspect-square grid place-content-center rounded bg-[#313131] border border-[#A1A1A1] text-white cursor-pointer hover:bg-red-500 duration-300"
          onClick={handleDelete}
        >
          X
        </div>
      )}
    </li>
  );
}

export default Property;
