import { useEffect, useState } from "react";
import { MdCheck } from "react-icons/md";

function Checkbox({ initialState, onChange }) {
  const [checked, setChecked] = useState();
  useEffect(() => {
    setChecked(initialState);
  }, [initialState]);

  const handleClick = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <div
      className={
        "w-5 h-5 border border-blue-600 rounded-lg cursor-pointer " +
        (checked ? "bg-blue-600" : "hover:bg-[#414141] duration-300")
      }
      onClick={handleClick}
    >
      {checked && <MdCheck className="text-white" />}
    </div>
  );
}

export default Checkbox;
