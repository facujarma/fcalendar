import React from "react";

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
    <div className="h-8 flex justify-between items-center p-2 md:px-12 mt-4 mb-2 gap-6">
      <div className="h-10 text-white text-xl aspect-square grid place-content-center rounded-full bg-[#313131] border border-[#A1A1A1] duration-300 cursor-pointer"
      onClick={() => handleClick(-1)}>
        {"<"}
      </div>

      <div className="w-full max-w-72 h-10 bg-[#313131] border border-[#A1A1A1] rounded-lg px-2 flex gap-2 justify-center items-center ">
        <span className="h-full text-gray-100 text-xl grid place-content-center">
          {meses[mes]}
        </span>
        <label
          htmlFor="span"
          className="text-gray-500 text-xl text-center "
        >
          {anio}
        </label>
      </div>

      <div
        onClick={() => handleClick(1)}
        className="h-10 text-white text-xl aspect-square grid place-content-center rounded-full bg-[#313131] border border-[#A1A1A1] duration-300 cursor-pointer"
      >
        {">"}
      </div>
    </div>
  );
}

export default SliderOfDate;
