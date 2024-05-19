import { useState } from "react";
import { registerUser } from "../../Firebase/UserAdministration";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await registerUser(name, email, password);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email en uso, ingresa otro por favor");
      } else if (error.code === "auth/weak-password") {
        toast.error("La contraseña debe tener al menos 6 caracteres");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Ingresa un email valido");
      }
    }
  };

  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="" className="text-sm text-white">
            Nombre de Usuario:
          </label>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Pepe"
            className="w-full h-10 border border-[#D9D9D9] rounded-lg bg-transparent px-2 text-white text-sm"
          />
        </div>
        <div>
          <label htmlFor="" className="text-sm text-white">
            Email:
          </label>
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="test@test.com"
            className="w-full h-10 border border-[#D9D9D9] rounded-lg bg-transparent px-2 text-white text-sm"
          />
        </div>

        <div className="relative">
          <label htmlFor="" className="text-sm text-white">
            Contraseña:
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? "text" : "password"}
            className="w-full h-10 border border-[#D9D9D9] rounded-lg bg-transparent px-2 text-white text-sm pr-10"
          />
          <div className="absolute top-9 right-2 flex items-center cursor-pointer">
            {showPassword ? (
              <IoEyeOffOutline
                onClick={togglePasswordVisibility}
                className="text-white"
              />
            ) : (
              <IoEyeOutline
                onClick={togglePasswordVisibility}
                className="text-white"
              />
            )}
          </div>
          <p className="text-[#ABABAB] text-xs mt-1">
            * La contraseña debe tener al menos 6 caracteres{" "}
          </p>
        </div>
        <input
          type="submit"
          value="Crear cuenta"
          className="w-36 h-8 bg-[#D9D9D9] text-[#212121] rounded-lg right-0 cursor-pointer text-sm mx-auto"
        />
      </form>
      <ToastContainer autoClose={1000} />
    </>
  );
}

export default RegisterForm;
