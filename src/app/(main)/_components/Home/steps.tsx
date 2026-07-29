import { Search, Send, Key } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Browse",
    description:
      "Explore our curated list of verified properties using smart filters to find your perfect match.",
    icon: Search,
    active: false,
  },
  {
    number: "2",
    title: "Send Request",
    description:
      "Apply directly through our secure platform. No hidden fees or redundant paperwork.",
    icon: Send,
    active: false,
  },
  {
    number: "3",
    title: "Move In",
    description:
      "Sign your lease digitally and pick up your keys. Welcome to your new, stress-free home.",
    icon: Key,
    active: true,
  },
];

export default function StepsSection() {
  return (
    <section className="w-full bg-white px-4 md:px-12 py-16 mb-20">
      <div className="max-w-250 mx-auto">
        <h2 className="text-center font-bold text-2xl md:text-3xl text-[#0b1c30] mb-16">
          Moving Home in 3 Steps
        </h2>

        <div className="relative grid grid-cols-3 gap-6">
          {/* connecting line */}
          <div className="absolute top-7 left-[16.66%] right-[16.66%] h-px bg-[#e5eeff] z-0" />

          {steps.map(({ number, title, description, icon: Icon, active }) => (
            <div
              key={title}
              className="relative z-10 flex flex-col items-center text-center px-2"
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 ${
                  active
                    ? "bg-[#006c49] text-white"
                    : "bg-[#eff4ff] text-[#515f74]"
                }`}
              >
                <Icon size={22} />
              </div>
              <h3 className="font-semibold text-base text-[#0b1c30] mb-2">
                {number}. {title}
              </h3>
              <p className="text-sm text-[#515f74] leading-relaxed max-w-55">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}