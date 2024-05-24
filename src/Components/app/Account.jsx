import Perfil from "../../assets/svg/Perfil";

function Account({ user }) {
  return (
    <div className="flex items-center w-full h-8 px-3 gap-2.5 bg-[#353535] rounded-md text-sm text-[#ABABAB]">
      <Perfil />
      <h3 className="w-full text-sm text-[#ABABAB]">
        {user.displayName ? user.displayName : user.email}
      </h3>
    </div>
  );
}

export default Account;
