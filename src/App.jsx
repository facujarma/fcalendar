import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LogInPage";
import AccountPage from "./Pages/AccountPage";
import PageNotFound from "./Pages/PageNotFound";
import Shortcuts from "./Pages/Shortcuts";

import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/conection";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />
          {/* <Route path="/shortcuts" element={<Shortcuts />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
