import React from "react";

function SearchBar() {
  return (
    <div className="w-full absolute bottom-[132%] md:bottom-2  grid place-content-center">
      <input
        type="text"
        className="w-80 h-8 md:h-10 border border-[#A1A1A1] rounded-lg text-sm bg-[#313131] focus:outline-[#444444] text-white px-2 "
        placeholder="Ingresa una etiqueta, nombre o fecha"
      />
    </div>
  );
}

export default SearchBar;
