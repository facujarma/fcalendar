import { useEffect, useState } from "react";
import { setUserEvents } from "../../Firebase/DocumentsManager";
import Checkbox from "./Checkbox";
import { MdOutlineDelete } from "react-icons/md";
import LinkProperty from "./LinkProperty";
import NumericProperty from "./NumericProperty";
import ColorProperty from "./DateProperty";
import DateProperty from "./DateProperty";
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
    setValue(eventSelected.properties[clave].value);
    console.log(eventSelected.properties[clave]);
  }, [eventSelected]);

  return (
    <li className="flex items-center w-full gap-4">
      <span className="text-[#dedede] text-sm"> {clave}: </span>
      <div className="flex items-center justify-between w-full gap-2">
        {eventSelected.properties[clave].type == "text" ? (
          <input
            type="text"
            placeholder={eventSelected.properties[clave].value}
            className="w-full h-6 px-2 bg-[#313131] border border-[#A1A1A1] rounded-lg text-sm text-[#A1A1A1]"
            value={value}
            onChange={(e) => {
              const newValue = e.target.value;
              setValue(newValue);
              eventSelected.properties[clave].value = newValue;
              setCalendarInformation({ ...calendarInformation });
              setUserEvents({ ...calendarInformation });
            }}
          />
        ) : eventSelected.properties[clave].type == "checkbox" ? (
          <Checkbox
            initialState={Boolean(value)}
            onChange={(newChecked) => {
              newChecked = Boolean(newChecked);
              setValue(newChecked);
              eventSelected.properties[clave].value = newChecked;
              setCalendarInformation({ ...calendarInformation });
              setUserEvents({ ...calendarInformation });
            }}
          />
        ) : eventSelected.properties[clave].type == "link" ? (
          <LinkProperty Link={value} />
        ) : eventSelected.properties[clave].type == "num" ? (
          <NumericProperty
            initialValue={value}
            onChange={(newValue) => {
              setValue(newValue);
              eventSelected.properties[clave].value = newValue;
              setCalendarInformation({ ...calendarInformation });
              setUserEvents({ ...calendarInformation });
            }}
          />
        ) : (
          eventSelected.properties[clave].type == "color" && (
            <DateProperty
              initialColor={value}
              onChange={(newValue) => {
                setValue(newValue);
                eventSelected.properties[clave].value = newValue;
                setCalendarInformation({ ...calendarInformation });
                setUserEvents({ ...calendarInformation });
              }}
            />
          )
        )}

        {isRequired ? null : (
          <MdOutlineDelete
            onClick={handleDelete}
            className="min-w-6 h-6 p-1 rounded-full text-red-500 cursor-pointer hover:bg-[#414141] duration-300"
          />
        )}
      </div>
    </li>
  );
}

export default Property;
