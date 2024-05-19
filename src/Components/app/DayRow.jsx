function DayRow({ index, day }) {
  return (
    <li
      className="w-full h-10 text-gray-400 border-b border-[#A1A1A1] grid place-content-center p-1 text-xs sm:text-sm"
      key={index}
    >
      {day}
    </li>
  );
}

export default DayRow;
