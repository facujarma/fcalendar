import { useState } from "react";
import { registerUser } from "../../Firebase/UserAdministration";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await registerUser(email, password);
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
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="" className="text-sm text-white">
            Email:
          </label>
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            placeholder="test@test.com"
            className="w-full h-10 border border-[#D9D9D9] rounded-lg bg-transparent px-2 text-white text-sm"
          />
        </div>

        <div>
          <label htmlFor="" className="text-sm text-white">
            Contraseña:
          </label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className="w-full h-10 border border-[#D9D9D9] rounded-lg bg-transparent px-2 text-white text-sm"
          />
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
