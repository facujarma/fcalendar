import React, { useContext } from "react";
import {
  CalendarContext,
  CategoriesContext,
  EventSelectedContext,
} from "../../Pages/HomePage";

import EventAddProperty from "./EventAddProperty";
import Property from "./Property";
import CategoryTag from "./CategoryTag";
import EventAddCategory from "./EventAddCategory";
import { setUserEvents } from "../../Firebase/DocumentsManager";
import EventTitle from "./EventTitle";
import { PiProhibit } from "react-icons/pi";

function EventInformation() {
  let { eventSelected, setEventSelected } = useContext(EventSelectedContext);
  const { categories } = useContext(CategoriesContext);

  const { setCalendarInformation, calendarInformation } =
    useContext(CalendarContext);

  const handleClickDelete = () => {
    eventSelected.active = false;
    setCalendarInformation({ ...calendarInformation });
    setUserEvents(calendarInformation);

    setEventSelected(undefined);
  };
  return (
    <>
      <div className="w-full">
        <EventTitle eventSelected={eventSelected} />
      </div>
      <section className="w-full mt-6">
        <ul className="flex w-full gap-2 flex-wrap">
          {eventSelected == null
            ? null
            : eventSelected.tags.map((tagname, index) => {
              return (
                <CategoryTag
                  key={index}
                  tagname={tagname}
                  i={index}
                  categories={categories}
                  setCalendarInformation={setCalendarInformation}
                  calendarInformation={calendarInformation}
                  eventSelected={eventSelected}
                />
              );
            })}
          {eventSelected == null ? null : (
            <EventAddCategory
              setCalendarInformation={setCalendarInformation}
              calendarInformation={calendarInformation}
              eventSelected={eventSelected}
            />
          )}
        </ul>

        <ul className="flex flex-col w-full mt-6 gap-2">
          {eventSelected && (
            <>
              <h3 className="text-[#ABABAB] text-xl">Propiedades:</h3>

              {Object.keys(eventSelected.properties)
                .filter(
                  (clave) =>
                    clave === "BackgroundColor" || clave === "TextColor" || clave === "PriorizePersonal"
                )
                .map((clave) => (
                  <Property
                    key={clave}
                    clave={clave}
                    isRequired={true}
                    eventSelected={eventSelected}
                    setCalendarInformation={setCalendarInformation}
                    calendarInformation={calendarInformation}
                  />
                ))}
              <div className="w-full h-[1px] bg-[#292929]"></div>
              {Object.keys(eventSelected.properties)
                .filter(
                  (clave) =>
                    clave !== "BackgroundColor" && clave !== "TextColor" && clave !== "PriorizePersonal"
                )
                .map((clave) => (
                  <Property
                    key={clave}
                    clave={clave}
                    isRequired={false}
                    eventSelected={eventSelected}
                    setCalendarInformation={setCalendarInformation}
                    calendarInformation={calendarInformation}
                  />
                ))}
            </>
          )}
        </ul>
      </section>

      {eventSelected == null ? null : (
        <div className="w-full flex flex-col gap-4 mt-12">
          <EventAddProperty />
          <div className="w-full flex gap-2">
            <button
              className="flex items-center justify-center gap-2 w-full h-9 border border-red-500 rounded-lg text-sm text-red-500 duration-300 hover:bg-red-500 hover:text-white"
              onClick={handleClickDelete}
            >
              <PiProhibit className="w-5 h-5" />
              Eliminar Evento
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default EventInformation;
