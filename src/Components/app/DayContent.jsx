import React from "react";
import DayEvent from "./DayEvent";

function DayContent({ events }) {

  return (
    <div
      className="w-full h-16 py-1 overflow-y-auto"

    >
      <ul className="flex flex-col w-full gap-1">
        {events &&
          events.map((event, index) =>
            event.active ? <DayEvent event={event} key={index} /> : null
          )}
      </ul>
    </div>
  );
}

export default DayContent;
