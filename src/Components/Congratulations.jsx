function Congratulations({ email }) {
  return (
    <div>
      <h3 className="text-xl text-white">
        Hola, <br/> {email}!
      </h3>
      <p className="text-slate-500 text-xs">Tus eventos se guardaran en la nube, no te preocupes de perderlos!</p>
    </div>
  );
}

export default Congratulations;
