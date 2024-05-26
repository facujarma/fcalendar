function StyleProperty({ name, setProperties, properties }) {
  return (
    <li className="flex flex-col justify-center w-full gap-1">
      <span className="text-[#ABABAB] text-sm">{name}:</span>
      <input
        type="text"
        value={properties[name]}
        onChange={(e) => {
          properties[name] = e.target.value;
          setProperties(properties);
        }}
        className="w-full h-7 px-2 bg-[#313131] border border-[#A1A1A1] rounded-lg text-sm text-[#A1A1A1]"
        placeholder={"Ingresa el valor de la propiedad: " + name}
      />
    </li>
  );
}

export default StyleProperty;
