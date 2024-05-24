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
      className="flex items-center w-full h-8 px-3 gap-2.5 border border-[#353535] rounded-md text-sm text-[#ABABAB] duration-300 hover:bg-[#353535]"
    >
      <Config /> Configuración de la cuenta
    </div>
  );
}

export default AccountConfig;
