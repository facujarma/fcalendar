import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { Spinner } from "@nextui-org/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/conection";
import Information from "../Components/Account/Information";
import { MdNavigateBefore } from "react-icons/md";

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
      <div className="flex items-center gap-2">
        <MdNavigateBefore
          className="text-3xl text-white"
          onClick={() => navigate("/")}
          cursor="pointer"
        />
        <h1 className="text-2xl text-white">Acerca de tu cuenta</h1>
      </div>

      <Information user={user} />
    </div>
  );
}

export default AccountPage;
