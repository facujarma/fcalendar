import CalendarDay from "./CalendarDay";
import DayRow from "./DayRow";
import SearchBar from "./SearchBar";
import SliderOfDate from "./SliderOfDate";
import { useState } from "react";

function Calendar() {
  const días = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const offsetMesPasado = (año, mes) => {
    var primerDia = new Date(año, mes, 1);
    var diaSemana = primerDia.getDay();

    var arr = [...Array(diaSemana)];
    let ultimoDiaMesPasado = new Date(año, mes, 0);

    for (let i = 0; i < diaSemana; i++) {
      arr[i] = ultimoDiaMesPasado.getDate() - diaSemana + i + 1;
    }
    return arr;
  };

  const offsetMesSiguiente = (año, mes) => {
    var ultimoDiaMes = new Date(año, mes + 1, 0).getDate();
    let r = ultimoDiaMes + offsetMesPasado(año, mes).length;
    r = 42 - r;
    let arr = [...Array(r)];
    for (let i = 0; i < r; i++) {
      arr[i] = i + 1;
    }
    return arr;
  };

  const getMonthAndYear = () => {
    let date = new Date();
    let mes = date.getMonth();
    let anio = date.getFullYear();

    return { mes, anio };
  };
  const DaysInMonth = (mes, anio) => {
    return new Date(anio, mes + 1, 0).getDate();
  };

  const [{ mes, anio }, setMonthAndYear] = useState({
    mes: getMonthAndYear().mes,
    anio: getMonthAndYear().anio,
  });

  return (
    <main className="relative aspect-square bg-[#212121] md:border-x md:border-white ">
      <SliderOfDate setMonthAndYear={setMonthAndYear} mes={mes} anio={anio} />

      <ul className="w-full h-10 grid grid-cols-7 grid-rows-6">
        {días.map((day, i) => (
          <DayRow key={i} day={day} />
        ))}
      </ul>

      <ul className="w-full h-[85.4%] grid grid-cols-7 grid-rows-6">
        {offsetMesPasado(anio, mes).map((_, i) => (
          <CalendarDay
            key={i}
            day={_}
            ID={_ + "-" + mes + "-" + anio}
            active={false}
          />
        ))}

        {[...Array(DaysInMonth(mes, anio))].map((_, i) => (
          <CalendarDay
            key={i}
            day={i + 1}
            ID={i + 1 + "-" + (mes + 1) + "-" + anio}
          />
        ))}

        {offsetMesSiguiente(anio, mes).map((_, i) => (
          <CalendarDay
            key={i}
            day={_}
            active={false}
            ID={_ + "-" + (mes + 2) + "-" + anio}
          />
        ))}
      </ul>

      {
        //<SearchBar />
      }
    </main>
  );
}

export default Calendar;
