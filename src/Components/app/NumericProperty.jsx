import React, { useEffect, useState } from "react";
import { MdOutlineNumbers } from "react-icons/md";

function NumericProperty({ initialValue, onChange }) {
  const [num, setNum] = useState(initialValue);

  useEffect(() => {
    setNum(initialValue);
  }, [initialValue]);

  return (
    <div className="inline-flex items-center px-2 gap-2 border border-blue-600 rounded-full">
      <MdOutlineNumbers className="text-blue-400 text-lg" />
      <input
        type="number"
        className="bg-transparent outline-none text-sm text-white w-auto"
        value={num}
        onChange={(e) => {
          setNum(e.target.value);
          if (onChange) onChange(e.target.value);
        }}
        style={{
          width: `${(num?.length || 1) + 2}ch`,
          minWidth: "2ch",
        }}
      />
    </div>
  );
}

export default NumericProperty;
