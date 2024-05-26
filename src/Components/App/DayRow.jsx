function DayRow({ index, day }) {
  return (
    <li
      className="grid place-content-center w-full h-10 p-1 border-b border-[#A1A1A1] text-gray-400 text-xs sm:text-sm"
      key={index}
    >
      {day}
    </li>
  );
}

export default DayRow;
