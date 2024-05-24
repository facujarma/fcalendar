import React, { useEffect } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

function SliderOfDate({ mes, anio, setMonthAndYear }) {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  useEffect(() => {
    const handleKeyDown = (event) => {
      const tagName = event.target.tagName.toLowerCase();
      if (
        tagName !== "input" &&
        tagName !== "textarea" &&
        event.key === "ArrowRight"
      ) {
        handleClick(1);
      }

      if (
        tagName !== "input" &&
        tagName !== "textarea" &&
        event.key === "ArrowLeft"
      ) {
        handleClick(-1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleClick = (c) => {
    mes += c;
    if (mes >= 12) {
      mes = 0;
      anio++;
    }
    if (mes < 0) {
      mes = 11;
      anio--;
    }
    setMonthAndYear({ mes: mes, anio: anio });
  };

  return (
    <div className="flex justify-between items-center h-8 mt-4 mb-2 p-2 gap-6 md:px-12">
      <div
        className="grid place-content-center h-10 aspect-square bg-[#313131] rounded-full text-white text-xl duration-300 cursor-pointer"
        onClick={() => handleClick(-1)}
      >
        <MdNavigateBefore />
      </div>

      <div className="flex flex-col justify-center items-center w-full max-w-72 h-10 gap-2">
        <span className="grid place-content-center h-full text-gray-100 text-2xl">
          {meses[mes]}
        </span>
        <label
          htmlFor="span"
          className="-mt-2 text-gray-500 text-md text-center"
        >
          {anio}
        </label>
      </div>

      <div
        onClick={() => handleClick(1)}
        className="grid place-content-center h-10 aspect-square bg-[#313131] rounded-full text-white text-xl duration-300 cursor-pointer"
      >
        <MdNavigateNext />
      </div>
    </div>
  );
}

export default SliderOfDate;
