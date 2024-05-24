import React, { useState, useContext } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { CategoriesContext } from "../Pages/HomePage";

import { setUserCategories } from "../../Firebase/DocumentsManager";
import Plus from "../../assets/svg/Plus";

function AñadirCategoria() {
  const { categories, setCategories } = useContext(CategoriesContext);

  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("");

  const colors = {
    Rojo: "#B42F2F",
    Azul: "#2F4CB4",
    Naranja: "#B45F2F",
    Violeta: "#812FB4",
    Rosa: "#B42F96",
    Verde: "#4d7c0f",
    Cyan: "#0891b2",
    Indigo: "#4f46e5",
  };

  const addCategory = () => {
    if (categoryName !== "") {
      setCategories({
        ...categories,
        [categoryName]: {
          color: colors[categoryColor],
          active: true,
          focused: false,
        },
      });
      setUserCategories({
        ...categories,
        [categoryName]: {
          color: colors[categoryColor],
          active: true,
          focused: false,
        },
      });
    }

    onOpenChange(false);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <li
        className="flex items-center w-full h-9 px-3 gap-2.5 bg-[#353535] rounded-md text-sm text-[#ABABAB] cursor-pointer duration-300 hover:bg-[#444444]"
        onClick={onOpen}
      >
        <Plus w="20"/>
        Añadir Categoría
      </li>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agrega una Categoría
              </ModalHeader>

              <ModalBody>
                <Input
                  isRequired
                  autoFocus
                  label="Nombre"
                  placeholder="Ingresa el nombre"
                  variant="bordered"
                  onChange={(e) => setCategoryName(e.target.value)}
                />

                <Select
                  label="Color"
                  placeholder="Selecciona el color"
                  className="max-w-md"
                  variant="bordered"
                  onChange={(e) => setCategoryColor(e.target.value)}
                >
                  {Object.keys(colors).map((clave) => (
                    <SelectItem key={clave} value={clave}>
                      {clave}
                      <div
                        style={{ backgroundColor: colors[clave] }}
                        className="w-4 h-4 rounded-full absolute right-2 bottom-2"
                      ></div>
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={onClose} onClick={addCategory}>
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

export default AñadirCategoria;
