import { logOutUser } from "../Firebase/UserAdministration";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
function logOut() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    logOutUser();
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div onClick={onOpen} className="text-white cursor-pointer border-2 border-slate-700 hover:bg-slate-700 duration-300 rounded h-8 grid place-content-center text-sm">
        Cerrar Sesión
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Cerrar Sesión:
              </ModalHeader>

              <ModalBody>
                <h3 className="font-bold">¿Estas seguro de cerrar sesión?</h3>
                <p>
                  Recuerda que, al momento de cerrar sesión todos tus eventos desaparecerán, y sera asi, hasta que vuelvas a iniciar sesión en tu cuenta.
                </p>
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
                  Cerrar Sesion
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default logOut;
