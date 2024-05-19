import { useState } from "react";
import { logInUser } from "../../Firebase/UserAdministration";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await logInUser(email, password);
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Credenciales invalidas, revíselas por favor.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
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
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="w-36 h-8 bg-[#D9D9D9] text-[#212121] rounded-lg right-0 cursor-pointer text-sm mx-auto"
        />
      </form>
      <ToastContainer autoClose={1000} />
    </>
  );
}

export default LoginForm;
