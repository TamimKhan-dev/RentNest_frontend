import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    description: "For individual landlords starting out.",
    price: "Free",
    priceSuffix: null,
    features: [
      "Up to 3 active listings",
      "Standard verification badge",
      "Direct messaging with tenants",
    ],
    cta: "Get Started",
    recommended: false,
  },
  {
    name: "Premium",
    description: "For professional rental businesses.",
    price: "$49",
    priceSuffix: "/month",
    features: [
      "Unlimited active listings",
      "Priority support & dedicated manager",
      "Advanced performance analytics",
      "Featured placement in search",
    ],
    cta: "Go Premium",
    recommended: true,
  },
];

export default function PricingSection() {
  return (
    <section className="w-full bg-white px-4 md:px-12 py-16 mb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl text-[#0b1c30] mb-3">
            List Your Property
          </h2>
          <p className="text-sm md:text-base text-[#515f74]">
            Choose the plan that fits your business. Join 300+ trusted
            landlords today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-205 mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.recommended
                  ? "bg-[#0b1c30] text-white shadow-xl"
                  : "bg-[#f8f9ff] border border-[#e5eeff] text-[#0b1c30]"
              }`}
            >
              {plan.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#10b981] text-white text-[10px] font-bold tracking-wide uppercase px-3 py-1 rounded-full">
                  Recommended
                </span>
              )}

              <h3 className="font-bold text-xl mb-1">{plan.name}</h3>
              <p
                className={`text-sm mb-6 ${
                  plan.recommended ? "text-white/70" : "text-[#515f74]"
                }`}
              >
                {plan.description}
              </p>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="font-bold text-4xl">{plan.price}</span>
                {plan.priceSuffix && (
                  <span
                    className={`text-sm ${
                      plan.recommended ? "text-white/70" : "text-[#515f74]"
                    }`}
                  >
                    {plan.priceSuffix}
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-8 grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <CheckCircle2
                      size={16}
                      className={
                        plan.recommended ? "text-[#4edea3]" : "text-[#006c49]"
                      }
                    />
                    <span
                      className={
                        plan.recommended ? "text-white/90" : "text-[#0b1c30]"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full h-auto py-3 rounded-xl font-semibold ${
                  plan.recommended
                    ? "bg-[#006c49] hover:bg-[#006c49]/90 text-white"
                    : "bg-transparent hover:bg-[#eff4ff] text-[#0b1c30] border border-[#bbcabf]"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}