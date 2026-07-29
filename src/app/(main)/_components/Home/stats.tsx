const stats = [
  {
    value: "10,000+",
    label: "Happy Travelers",

  },
  {
    value: "2,500+",
    label: "Verified Properties",

  },
  {
    value: "300+",
    label: "Trusted Landlords",

  },
  {
    value: "98%",
    label: "Satisfaction Rate",

  },
];

export default function Stats() {
  return (
    <section className="w-full bg-[#eff4ff] py-10 px-4 md:px-12 mb-20">
      <div className="w-full mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center">
            <p className="font-bold text-3xl md:text-4xl text-[#006c49]">
              {value}
            </p>
            <p className="mt-1 text-sm font-medium text-[#515f74]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}