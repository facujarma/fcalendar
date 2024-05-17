import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/conection.js";

import Calendar from "./Components/Calendar";
import Menu from "./Components/Menu";
import Information from "./Components/Information";
import {
  getUserCategories,
  getUserEvents,
} from "./Firebase/DocumentsManager.js";

export const CalendarContext = React.createContext();
export const EventSelectedContext = React.createContext();
export const CategoriesContext = React.createContext();
export const UserContext = React.createContext();

function App() {
  const [calendarInformation, setCalendarInformation] = useState({});
  const [categories, setCategories] = useState({ Otros: {color: "#444444", active: true} });
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      getUserEvents().then((events) => {
        setCalendarInformation(events);
      });
      getUserCategories().then((categories) => {
        setCategories(categories);
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [eventSelected, setEventSelected] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
    </UserContext.Provider>
  );
}

export default App;
