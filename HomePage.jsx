import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../app/Calendar";
import Menu from "../app/Menu";
import Information from "../app/Information";
import { UserContext } from "../../App";
import {
  getUserEvents,
  getUserCategories,
  setUserCategories,
} from "../../Firebase/DocumentsManager";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/conection";
import { Spinner } from "@nextui-org/react";

export const CalendarContext = React.createContext();
export const EventSelectedContext = React.createContext();
export const CategoriesContext = React.createContext();

function HomePage() {
  const [calendarInformation, setCalendarInformation] = useState({});
  const [categories, setCategories] = useState({
    Otros: { color: "#444444", active: true },
  });
  const [eventSelected, setEventSelected] = useState();
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      getUserEvents().then((events) => {
        setCalendarInformation(events);
      });
      getUserCategories().then((categories) => {
        if (!categories) {
          categories = { Otros: { color: "#444444", active: true } };
          setUserCategories(categories);
        }

        setCategories(categories);
      });
    });

    return () => {
      unsubscribe();
    };
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#212121]">
        <Spinner color="secondary" labelColor="secondary" />
        <p className="text-[#ABABAB] text-center">
          Recuperando su información <br /> Por favor espere unos segundos.
        </p>
      </div>
    );
  }

  if (!user) {
    navigate("/login");
  }

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

export default HomePage;
