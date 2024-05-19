import { useState } from "react";
import { updateName } from "../../Firebase/UserAdministration";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Information({ user }) {
  const [name, setName] = useState(user?.displayName);
  const [canSend, setCanSend] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSend) {
      try {
        updateName(name);
        toast.success("Información actualizada");
        setCanSend(false);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="w-full md:w-2/4 mx-auto h-52 md:h-72 bg-[#353535] rounded-lg p-4 relative mt-12">
      <h2 className="text-[#8A8A8A] text-xl">Información Personal:</h2>
      <form onSubmit={handleSubmit}>
        <ul className="flex flex-col gap-2 mt-4">
          <li className="flex gap-4">
            <label className="text-white text-sm md:text-base">
              Nombre de usuario:
            </label>
            <input
              onChange={(e) => {
                setName(e.target.value);
                setCanSend(true);
              }}
              type="text"
              value={name}
              className="min-w-36 w-60 h-8 border border-[#535353] bg-[#2E2E2E] rounded text-white px-2"
            />
          </li>
          <li className="flex gap-4">
            <label className="text-white text-sm md:text-base">
              Nombre de usuario:
            </label>
            <input
              disabled
              type="text"
              value={user?.email}
              className="min-w-36 w-60 h-8 border border-[#535353] bg-[#2E2E2E] rounded text-white px-2"
            />
          </li>
        </ul>
        <input
          type="submit"
          value="Guardar"
          disabled={!canSend}
          className={
            "absolute bottom-4 right-4 w-24 h-8 text-[#212121] rounded-lg right-0 cursor-pointer text-sm mx-auto " +
            (canSend ? "bg-[#D9D9D9]" : "bg-[#535353]")
          }
        />
      </form>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default Information;
