import React from "react";
import DayEvent from "./DayEvent";

function DayContent({ events }) {

  return (
    <div
      className="w-full h-16 overflow-y-auto py-1"

    >
      <ul className="flex flex-col gap-1 w-full">
        {events &&
          events.map((event, index) =>
            event.active ? <DayEvent event={event} key={index} /> : null
          )}
      </ul>
    </div>
  );
}

export default DayContent;
