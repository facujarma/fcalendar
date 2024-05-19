import React, { useContext, useState } from "react";
import {
  CalendarContext,
  CategoriesContext,
  EventSelectedContext,
} from "../HomePage";

import EventAddProperty from "./EventAddProperty";
import Property from "./Property";
import CategoryTag from "./CategoryTag";
import EventAddCategory from "./EventAddCategory";
import { setUserEvents } from "../../Firebase/DocumentsManager";

function EventInformation() {
  let { eventSelected } = useContext(EventSelectedContext);
  const { categories } = useContext(CategoriesContext);

  const { setCalendarInformation, calendarInformation } =
    useContext(CalendarContext);

  const handleClickDelete = () => {
    eventSelected.active = false;
    setCalendarInformation({ ...calendarInformation });

    setUserEvents(calendarInformation);
  };

  return (
    <>
      <div className="w-full">
        <h3 className="text-white text-3xl flex flex-col gap-1">
          {eventSelected == null ? "Selecciona un Evento" : eventSelected.title}
        </h3>
      </div>
      <section className="w-full mt-6">
        <ul className="w-full flex gap-2 flex-wrap">
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

        <ul className="w-full mt-6 flex flex-col gap-2">
          {eventSelected && (
            <>
              <h3 className="text-[#ABABAB] text-xl">Propiedades:</h3>

              {Object.keys(eventSelected.properties).map((clave) => {
                return (
                  <Property
                    key={clave}
                    clave={clave}
                    isRequired={
                      clave == "BackgroundColor" || clave == "TextColor"
                    }
                    eventSelected={eventSelected}
                    setCalendarInformation={setCalendarInformation}
                    calendarInformation={calendarInformation}
                  />
                );
              })}
            </>
          )}
        </ul>
      </section>

      {eventSelected == null ? null : (
        <div className="w-full flex flex-col gap-4 mt-12">
          <EventAddProperty />
          <div className="w-full flex gap-2">
            <button
              className="w-full h-8 rounded-lg text-red-500 border border-red-500 hover:bg-red-500 hover:text-white duration-300"
              onClick={handleClickDelete}
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default EventInformation;
