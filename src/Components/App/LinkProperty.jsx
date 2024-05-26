import React, { useEffect, useState } from "react";
import { MdOutlineLink } from "react-icons/md";

function LinkProperty({ Link }) {
  const [link, setLink] = useState("");
  useEffect(() => {
    setLink(Link);
  });

  return (
    <a
      href={link}
      className="flex items-center px-2 gap-1.5 border border-blue-600 rounded-full text-sm text-blue-400 duration-300 hover:bg-blue-600 hover:text-white"
    >
      <MdOutlineLink /> Enlace
    </a>
  );
}

export default LinkProperty;
