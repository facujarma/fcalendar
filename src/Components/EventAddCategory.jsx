import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState, useContext } from "react";
import {
  CategoriesContext,
  CalendarContext,
  EventSelectedContext,
} from "../App";
import { setUserEvents } from "../Firebase/DocumentsManager";

function EventAddCategory() {
  let { eventSelected } = useContext(EventSelectedContext);
  const { categories } = useContext(CategoriesContext);

  const { setCalendarInformation, calendarInformation } =
    useContext(CalendarContext);

  const [eventCategories, setEventCategories] = useState([]);

  const handleAddCategory = () => {
    eventSelected.tags = [...eventSelected.tags, ...eventCategories];
    setCalendarInformation({ ...calendarInformation });
    setUserEvents(user.uid, calendarInformation);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <li
        className="h-5 px-2 text-white rounded-full text-xs grid place-content-center relative bg-[#444444] cursor-pointer"
        onClick={onOpen}
      >
       + Añadir
      </li>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Añade una categoría al evento
              </ModalHeader>

              <ModalBody>
                <Select
                  label="Etiquetas"
                  placeholder="Selecciona las Etiquetas"
                  selectionMode="multiple"
                  className="max-w-md"
                  variant="bordered"
                  onChange={(e) => {
                    setEventCategories(e.target.value.split(","));
                  }}
                >
                  {Object.keys(categories).map((clave) => (
                    <SelectItem key={clave} value={clave}>
                      {clave}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={handleAddCategory}
                >
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

export default EventAddCategory;
