import Config from "../../assets/svg/Config";
import { useNavigate } from "react-router-dom";
function AccountConfig() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/account");
  };

  return (
    <div
      onClick={handleClick}
      className="h-8 w-full rounded-md border border-[#353535] flex px-3 items-center gap-2.5 text-sm text-[#ABABAB] cursor-pointer hover:bg-[#353535] duration-300"
    >
      <Config /> Configuración de la cuenta
    </div>
  );
}

export default AccountConfig;
