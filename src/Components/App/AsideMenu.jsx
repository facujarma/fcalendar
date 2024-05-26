import Account from "./Account";
import LogOut from "./LogOut";
import AccountConfig from "./AccountConfig";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { MdClose } from "react-icons/md";

function AsideMenu({ user }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const deviceWidth = window.innerWidth;

  return (
    <>
      <div className="block md:hidden text-white" onClick={handleClick}>
        <IoMenu className="text-2xl text-[#ABABAB]" />
      </div>

      <div
        className={`${open ? "flex" : deviceWidth > 768 ? "flex" : "hidden"
          } p-2 md:p-0 top-0 left-0 z-10 h-screen md:h-auto fixed md:relative flex flex-col gap-2 bg-[#252525] md:bg-transparent transition-all duration-300`}
      >
        <div
          className={`${open ? "block" : "hidden"} md:hidden text-white w-full`}
          onClick={handleClick}
        >
          <MdClose className="text-2xl text-[#ABABAB]" />
        </div>

        <Account user={user} />
        <AccountConfig />
        <LogOut />
      </div>
    </>
  );
}

export default AsideMenu;
