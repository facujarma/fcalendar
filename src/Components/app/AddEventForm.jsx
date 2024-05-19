import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  DatePicker,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState, useContext } from "react";
import { CalendarContext, CategoriesContext } from "../Pages/HomePage";
import { setUserEvents } from "../../Firebase/DocumentsManager";
import Plus from "../../assets/svg/Plus";

function AddEventForm() {
  const { calendarInformation, setCalendarInformation } =
    useContext(CalendarContext);

  const { categories } = useContext(CategoriesContext);

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [eventCategories, setEventCategories] = useState([]);

  function handleSubmit() {
    if (!eventDate || !eventDate.day || !eventDate.month || !eventDate.year) {
      console.error("La fecha del evento no está completa.");
      return;
    }
    const fecha = `${eventDate.day}-${eventDate.month}-${eventDate.year}`;
    const name = eventName;
    let events;
    if (!calendarInformation) {
      events = {
        [fecha]: [
          {
            id: `${fecha}-1`,
            tags: eventCategories,
            title: name,
            date: fecha,
            active: true,
            visibility: true,
            properties: {
              BackgroundColor: "#404040",
              TextColor: "#FFFFFF",
            },
          },
        ],
      };
    } else {
      events = { ...calendarInformation };
      if (events[fecha]) {
        events[fecha].push({
          id: `${fecha}-${events[fecha].length + 1}`,
          tags: eventCategories,
          title: name,
          date: fecha,
          active: true,
          visibility: true,
          properties: {
            BackgroundColor: "#404040",
            TextColor: "#FFFFFF",
          },
        });
      } else {
        events[fecha] = [
          {
            id: `${fecha}-1`,
            tags: eventCategories,
            title: name,
            date: fecha,
            active: true,
            visibility: true,
            properties: {
              BackgroundColor: "#404040",
              TextColor: "#FFFFFF",
            },
          },
        ];
      }
    }
    setCalendarInformation(events);
    setUserEvents(events);
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <li
        className="w-full h-9 bg-[#353535] rounded-md flex items-center gap-2.5 text-sm px-3 text-[#ABABAB] cursor-pointer hover:bg-[#444444] duration-300"
        onClick={onOpen}
      >
        <Plus w="20" />
        Añadir Evento
      </li>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agrega un Evento
              </ModalHeader>

              <ModalBody>
                <Input
                  isRequired
                  autoFocus
                  label="Nombre"
                  placeholder="Ingresa el nombre"
                  variant="bordered"
                  onChange={(e) => setEventName(e.target.value)}
                />
                <DatePicker
                  label="Fecha"
                  isRequired
                  variant="bordered"
                  onChange={(date) => setEventDate(date)}
                />

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
                  onClick={handleSubmit}
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

export default AddEventForm;
