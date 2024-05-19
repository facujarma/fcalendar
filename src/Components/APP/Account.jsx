import Perfil from "../svg/Perfil";

function Account({ email }) {
  return (
    <div className="h-8 w-full rounded-md bg-[#353535] flex px-3 items-center gap-2.5 text-sm text-[#ABABAB] cursor-pointer">
      <Perfil />
      <h3 className="text-sm text-[#ABABAB] w-full">
        {email ? email : "Anonimo"}
      </h3>
    </div>
  );
}

export default Account;
