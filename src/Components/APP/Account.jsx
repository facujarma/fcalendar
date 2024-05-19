import Perfil from "../svg/Perfil";

function Account({ user }) {
  return (
    <div className="h-8 w-full rounded-md bg-[#353535] flex px-3 items-center gap-2.5 text-sm text-[#ABABAB]">
      <Perfil />
      <h3 className="text-sm text-[#ABABAB] w-full">
        {user.displayName ? user.displayName : user.email}
      </h3>
    </div>
  );
}

export default Account;
