import CardStep from "../shortcuts/CardStep";
import { useEffect, useState } from "react";
import { getUserCategories } from "../../Firebase/DocumentsManager";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/conection";
import { useNavigate } from "react-router-dom";
import StyleProperty from "../Shortcuts/StyleProperty";

export default function Shortcuts() {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [properties, setProperties] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
      const fetchCategories = async () => {
        try {
          const categories = await getUserCategories();
          setCategories({ ...categories });
        } catch (error) {
          console.error("Error fetching categories:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCategories();
    });
  }, []);

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
          desc=" El primer paso que debes hacer es el de seleccionar una categoría
          sobre la cual se aplicarán los estilos."
          n={1}
        >
          <Select
            label="Categoría"
            placeholder="Selecciona la categoría"
            className="max-w-md dark"
            variant="bordered"
            onChange={(e) => setCategory(e.target.value)}
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
        </CardStep>
        <CardStep
          title="Elije el orden de jerarquía."
          desc="  Es posible que las propiedad de esta categoría entren en conflicto
          con los de otra, arrastra por encima para expresar que quieres que
          se le de mas importancia a esta, o hacia abajo para lo contrario."
          n={3}
        />
      </main>
    </div>
  );
}
