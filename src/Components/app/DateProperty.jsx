import { DateInput, DatePicker } from "@nextui-org/react";
import { useState, useEffect } from "react";
function DateProperty({ initialDate, onChange }) {
  const [date, setDate] = useState(initialDate);

  useEffect(() => {
    setDate(initialDate);
  }, [initialDate]);

  return (
    <div className="flex items-center px-2 gap-2 border border-blue-600 rounded-full">
      <DateInput
        classNames={{ input: "max-h-2 p-0", base: "max-h-2 p-0" }}
        value={date}
        onChange={setDate}
      />
    </div>
  );
}

export default DateProperty;
