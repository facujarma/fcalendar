import React, { useContext, useState } from "react";
import { EventSelectedContext, CategoriesContext } from "../App";
import { CalendarContext } from "../App";
import EventAddProperty from "./EventAddProperty";
import Property from "./Property";
import CategoryTag from "./CategoryTag";
import EventAddCategory from "./EventAddCategory";
import { setUserEvents } from "../Firebase/DocumentsManager";

function EventInformation() {
  let { eventSelected } = useContext(EventSelectedContext);
  const { categories } = useContext(CategoriesContext);

  const { setCalendarInformation, calendarInformation } =
    useContext(CalendarContext);

  const [disabled, setDisabled] = useState(true);

  const handleClickEdit = () => {
    if (disabled == false) {
      setUserEvents(calendarInformation);
    }
    setDisabled(!disabled);
  };

  const handleClickDelete = () => {
    eventSelected.active = false;
    setCalendarInformation({ ...calendarInformation });

    setUserEvents(calendarInformation);
  };

  const handleVisibility = () => {
    eventSelected.visibility = !eventSelected.visibility;
    setCalendarInformation({ ...calendarInformation });
    setUserEvents(calendarInformation);
  };

  return (
    <>
      <div className="w-full">
        <h3 className="text-white text-3xl flex flex-col gap-1">
          {eventSelected == null ? "Selecciona un Evento" : eventSelected.title}
          <button onClick={handleVisibility}>
            {eventSelected == null ? null : eventSelected.visibility ? (
              <img
                src="public/visibility-active.svg"
                alt="Activar visibilidad"
              />
            ) : (
              <img
                src="public/visibility-hidden.svg"
                alt="Activar visibilidad"
              />
            )}
          </button>
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

        <ul className="w-full mt-6 flex flex-col gap-4">
          <h3 className="text-white text-xl">Propiedades:</h3>
          {eventSelected == null
            ? null
            : Object.keys(eventSelected.properties).map((clave) => {
                return (
                  <Property
                    key={clave}
                    clave={clave}
                    disabled={disabled}
                    isRequired={
                      clave == "BackgroundColor" || clave == "TextColor"
                    }
                    eventSelected={eventSelected}
                    setCalendarInformation={setCalendarInformation}
                    calendarInformation={calendarInformation}
                  />
                );
              })}
        </ul>
      </section>

      {eventSelected == null ? null : (
        <div className="w-full flex flex-col gap-4 mt-12">
          <EventAddProperty />
          <div className="w-full flex gap-2">
            <button
              className="w-full h-8 rounded-lg text-green-500 border border-green-500 hover:bg-green-500 hover:text-white duration-300"
              onClick={handleClickEdit}
            >
              {disabled ? "Editar" : "Guardar"}
            </button>
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
