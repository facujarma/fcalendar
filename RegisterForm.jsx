import { useState } from "react";
import { registerUser } from "../Firebase/UserAdministration";
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div
        onClick={onOpen}
        className="text-white cursor-pointer border-2 border-slate-700 rounded h-8 grid place-content-center text-sm"
      >
        Registrarse
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Registrarse:
              </ModalHeader>

              <ModalBody>
                <Input
                  isRequired
                  autoFocus
                  label="Email"
                  placeholder="Ingresa tu Email"
                  type="email"
                  variant="bordered"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  isRequired
                  label="Contraseña"
                  placeholder="Ingresa tu contraseña"
                  type="password"
                  variant="bordered"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={handleSubmit}
                >
                  Registrarse
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ToastContainer autoClose={1000} />
    </>
  );
}

export default RegisterForm;
