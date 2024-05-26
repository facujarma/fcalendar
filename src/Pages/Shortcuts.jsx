import CardStep from "../Components/Shortcuts/CardStep";
import { useEffect, useState } from "react";
import { getUserCategories, getUserShortcuts, setUserShortcuts } from "../Firebase/DocumentsManager";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Connection";
import { useNavigate } from "react-router-dom";
import StyleProperty from "../Components/Shortcuts/StyleProperty";
import DragAndDrop from "../Components/Shortcuts/DragAndDrop";

export default function Shortcuts() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [properties, setProperties] = useState({});
  const [shortcuts, setShortcuts] = useState([])


  const [propertiesChanged, setPropertiesChanged] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
      const fetchData = async () => {
        try {
          //Categories
          const categories = await getUserCategories();
          setCategories({ ...categories });

          //Shortcuts
          const shortcutsData = await getUserShortcuts();
          if (shortcutsData) {
            const shortcutsArray = Object.values(shortcutsData);
            setShortcuts(shortcutsArray);
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    });
  }, []);

  const handleCreate = () => {
    const newShortcut = {
      name: selectedCategory,
      properties: {
        ...properties,
      },
      shortcutPriority: shortcuts.length
    }
    setPropertiesChanged(true) //habilita el tercer CardStep
    setShortcuts([...shortcuts, newShortcut])
  }

  const handleSubmit = async () => {
    await setUserShortcuts({ ...shortcuts });
    navigate("/");
  }

  if (loading) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#212121]">
        <Spinner color="secondary" labelColor="secondary" />
        <p className="text-[#ABABAB] text-center">
          Recuperando su información <br /> Por favor espere unos segundos.
        </p>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen bg-[#212121] p-4">
      <header className="max-w-sm">
        <h1 className="text-2xl text-white">
          Personaliza atajos para tus eventos:
        </h1>
        <p className="text-sm text-[#ABABAB] mt-2 text-pretty">
          Desde esta pestaña podrás acceder a un panel que permita asignar
          diferentes estilos a los eventos dependiendo de las categorías que
          tengan dentro.
        </p>
      </header>
      <main className="w-full grid grid-cols-3 mt-12">
        <CardStep
          title="Selecciona la categoría"
          desc="El primer paso que debes hacer es el de seleccionar una categoría
          sobre la cual se aplicarán los estilos."
          n={1}
          active={true}
        >
          <Select
            label="Categoría"
            placeholder="Selecciona la categoría"
            className="max-w-md dark"
            variant="bordered"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {Object.keys(categories).map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </Select>
        </CardStep>

        <CardStep
          title="Aplica los estilos que desees."
          desc="Modifica las siguientes propiedades a tu gusto. Sobre cualquier evento
          con la categoría seccionada se aplicaran los estilos."
          n={2}
          active={selectedCategory !== ""}
        >
          <ul className="flex flex-col gap-4">
            <StyleProperty
              name="TextColor"
              setProperties={setProperties}
              properties={properties}
            />
            <StyleProperty
              name="BackgroundColor"
              setProperties={setProperties}
              properties={properties}
            />
          </ul>
          <button onClick={handleCreate} className="min-w-24 h-8 px-2 mt-8 bg-[#2F4CB4] rounded-lg text-white text-sm">Siguiente</button>
        </CardStep>
        <CardStep
          title="Elije el orden de jerarquía."
          desc="  Es posible que las propiedad de esta categoría entren en conflicto
          con los de otra, arrastra por encima para expresar que quieres que
          se le de mas importancia a esta, o hacia abajo para lo contrario."
          n={3}
          active={propertiesChanged}
        >
          <DragAndDrop shortcuts={shortcuts} setShortcuts={setShortcuts} />
          <button onClick={handleSubmit} className="min-w-24 h-8 px-2 mt-8 bg-[#2F4CB4] rounded-lg text-white text-sm">Terminar y Guardar</button>
        </CardStep>
      </main>
    </div>
  );
}
