import "./App.css";
import Calendar from "./Components/Calendar";
import Information from "./Components/Information";
import Menu from "./Components/Menu";
import React from "react";
import { useEffect, useState } from "react";

export const CalendarContext = React.createContext();
export const EventSelectedContext = React.createContext();
export const CategoriesContext = React.createContext();
function App() {
  const [calendarInformation, setCalendarInformation] = useState({});

  const [categories, setCategories] = useState({ Otros: "#444444" });

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setCalendarInformation(JSON.parse(storedEvents));
    }

    let c = JSON.parse(localStorage.getItem("categories"));
    if (!c) {
      c = {
        Otros: "#2F4CB4",
      };
      localStorage.setItem("categories", JSON.stringify(c));
    } else {
      setCategories(JSON.parse(localStorage.getItem("categories")));
    }
  }, []);

  const [eventSelected, setEventSelected] = useState();

  return (
    <CalendarContext.Provider
      value={{ calendarInformation, setCalendarInformation }}
    >
      <EventSelectedContext.Provider
        value={{ eventSelected, setEventSelected }}
      >
        <CategoriesContext.Provider value={{ categories, setCategories }}>
          <div className="md:h-screen flex flex-col md:flex-row">
            <Menu />
            <Calendar />
            <Information />
          </div>
        </CategoriesContext.Provider>
      </EventSelectedContext.Provider>
    </CalendarContext.Provider>
  );
}

export default App;
