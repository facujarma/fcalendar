import Step from "./Step";

function CardStep({ children, title, desc, n, active }) {
  return (
    <div className="relative w-full px-4 py-2">
      <header>
        <h3 className="flex gap-2 text-xl text-[#EEE]">
          <Step number={n} />
          {title}
        </h3>
        <p className="mb-4 mt-2 text-sm text-[#ABABAB]">{desc}</p>
      </header>

      { active && children}
    </div>
  );
}

export default CardStep;
