import { useContext, useState } from "react";
import { CalendarContext, EventSelectedContext } from "../Pages/HomePage";
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
import { setUserEvents } from "../../Firebase/DocumentsManager";

function EventAddProperty() {
  const [propertyName, setPropertyName] = useState("");
  const [propertyValue, setPropertyValue] = useState("");

  const { eventSelected } = useContext(EventSelectedContext);
  const { calendarInformation, setCalendarInformation } =
    useContext(CalendarContext);

  const handleClick = () => {
    eventSelected.properties[propertyName] = propertyValue;
    setCalendarInformation({ ...calendarInformation });

    setUserEvents({ ...calendarInformation });
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        className="flex justify-center items-center w-full h-8 px-3 gap-2.5 bg-[#2F4CBB] rounded-md text-sm text-white"
        onClick={onOpen}
      >
        Agregar propiedad
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agrega una propiedad
              </ModalHeader>

              <ModalBody>
                <Input
                  isRequired
                  autoFocus
                  label="Nombre"
                  placeholder="Ingresa el nombre de la propiedad"
                  variant="bordered"
                  onChange={(e) => setPropertyName(e.target.value)}
                />
                <Input
                  isRequired
                  label="Valor"
                  placeholder="Ingresa el valor de la propiedad"
                  variant="bordered"
                  onChange={(e) => setPropertyValue(e.target.value)}
                />
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={onClose} onClick={handleClick}>
                  Agregar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default EventAddProperty;
