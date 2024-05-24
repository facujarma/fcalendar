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
    <li className="flex items-center w-full gap-4">
      <span className="text-[#dedede] text-sm"> {clave}: </span>
      <input
        type="text"
        placeholder={eventSelected.properties[clave]}
        className="w-full h-6 px-2 bg-[#313131] border border-[#A1A1A1] rounded text-sm text-[#A1A1A1]"
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
          className="grid place-content-center h-6 aspect-square bg-[#313131] border border-[#A1A1A1] rounded text-white cursor-pointer duration-300 hover:bg-red-500"
          onClick={handleDelete}
        >
          X
        </div>
      )}
    </li>
  );
}

export default Property;
