import React, { useState, useEffect } from 'react';
import DragAndDrop from '../Components/NewShortcuts/DragAndDrop';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@nextui-org/react';
import { auth } from '../Firebase/Connection';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserShortcuts, setUserShortcuts } from '../Firebase/DocumentsManager';
import Header from "../Components/Layout/Header";

function Shortcuts() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [shortcuts, setShortcuts] = useState([]);

  const handleCreate = () => {
    setUserShortcuts({ ...shortcuts })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
      } else {
        try {
          const shortcutsData = await getUserShortcuts();
          if (shortcutsData) {
            const shortcutsArray = Object.values(shortcutsData);
            setShortcuts(shortcutsArray);
          }
        } catch (error) {
          console.error("Error fetching shortcuts:", error);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

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
      <Header title="Administra tus Shortcuts" description="Aqui podras administar la jerarquia de tus shortcuts para que algunos estilos prevalezcan por sobre otros." />
      <main className='flex flex-col max-w-64 p-4 mt-10 mx-auto border border-[#ABABAB] rounded-lg '>
        <h2 className='mb-4 text-white text-2xl'>Mueve tus Shortcuts</h2>
        <DragAndDrop shortcuts={shortcuts} setShortcuts={setShortcuts} />
        <button onClick={handleCreate} className="w-full h-8 px-2 mt-8 bg-[#2F4CB4] rounded-lg text-white text-sm">Guardar Cambios</button>
      </main>
    </div>
  );
}

export default Shortcuts;
