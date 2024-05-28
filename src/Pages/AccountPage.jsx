import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { Spinner } from "@nextui-org/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Connection";
import Information from "../Components/Account/Information";
import { MdNavigateBefore } from "react-icons/md";
import Header from "../Components/Layout/Header";

function AccountPage() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-[#212121]">
        <Spinner label="Loading..." color="secondary" labelColor="secondary" />
      </div>
    );
  }

  if (!user) {
    navigate("/login");
  }

  return (
    <div className="w-screen min-h-screen bg-[#212121] p-6">
      <Header title="Acerca de tu cuenta" description="En esta seccion encontraras toda la informacion que recuperamos y utilizamos de tu cuenta." />

      <Information user={user} />
    </div>
  );
}

export default AccountPage;
