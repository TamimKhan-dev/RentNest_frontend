import { ShieldCheck, Wallet, Headset, LayoutDashboard } from "lucide-react";

export default function WhyChooseSection() {
  return (
    <section className="w-full bg-[#f8f9ff] px-4 md:px-12 py-16">
      <div className="max-w-275 mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-bold text-2xl md:text-3xl text-[#0b1c30] mb-3">
            Why Choose Person Name?
          </h2>
          <p className="text-sm md:text-base text-[#515f74] max-w-xl mx-auto">
            We&apos;ve reimagined the rental experience to be faster, safer, and
            more delightful for everyone involved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
          {/* Card 1 — Verified Properties */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-[#e5eeff] p-7">
            <div className="w-10 h-10 rounded-lg bg-[#d7f5e9] flex items-center justify-center mb-5">
              <ShieldCheck size={20} className="text-[#006c49]" />
            </div>
            <h3 className="font-semibold text-lg text-[#0b1c30] mb-2">
              100% Verified Properties
            </h3>
            <p className="text-sm text-[#515f74] leading-relaxed max-w-md">
              Every listing on our platform undergoes a rigorous 50-point
              inspection process. We check everything from Wi-Fi speeds to
              structural integrity.
            </p>
          </div>

          {/* Card 2 — Secure Booking */}
          <div className="md:col-span-1 bg-[#006c49] rounded-2xl p-7">
            <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center mb-5">
              <Wallet size={20} className="text-white" />
            </div>
            <h3 className="font-semibold text-lg text-white mb-2">
              Secure Booking
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Payments are held in escrow until you move in. Fraud-free and
              completely transparent financial transactions.
            </p>
          </div>

          {/* Card 3 — 24/7 Concierge */}
          <div className="md:col-span-1 bg-[#dce7fd] rounded-2xl p-7">
            <div className="w-10 h-10 rounded-lg bg-white/60 flex items-center justify-center mb-5">
              <Headset size={20} className="text-[#0b1c30]" />
            </div>
            <h3 className="font-semibold text-lg text-[#0b1c30] mb-2">
              24/7 Concierge
            </h3>
            <p className="text-sm text-[#515f74] leading-relaxed">
              Our dedicated team is always on standby to help you with anything
              from maintenance to local recommendations.
            </p>
          </div>

          {/* Card 4 — All-in-One Dashboard */}
          <div className="relative md:col-span-2 bg-white rounded-2xl border border-[#e5eeff] p-7 flex items-center justify-between gap-6 overflow-hidden">
            <div className="max-w-[60%] sm:max-w-[50%]">
              <div className="w-10 h-10 rounded-lg bg-[#eff4ff] flex items-center justify-center mb-5">
                <LayoutDashboard size={20} className="text-[#0b1c30]" />
              </div>
              <h3 className="font-semibold text-lg text-[#0b1c30] mb-2">
                All-in-One Dashboard
              </h3>
              <p className="text-sm text-[#515f74] leading-relaxed max-w-xs">
                Manage your lease, pay rent, and request services all from one
                beautifully designed interface.
              </p>
            </div>

            {/* mini wireframe mockup */}
            <div className="absolute bottom-0 right-4 sm:right-8 hidden sm:flex md:hidden lg:flex flex-col gap-2 bg-[#f8f9ff] rounded-t-xl border border-[#e5eeff] p-3 w-56 md:w-64 lg:w-70 h-40 md:h-44 lg:h-50 shrink-0">
              <div className="h-3 w-3/4 rounded-full bg-[#bfe3d4]" />
              <div className="h-2 w-full rounded-full bg-[#e5eeff]" />
              <div className="h-2 w-5/6 rounded-full bg-[#e5eeff]" />
              <div className="flex gap-2 mt-1">
                <div className="h-8 w-8 rounded-md bg-[#e5eeff]" />
                <div className="flex-1 flex flex-col justify-center gap-1.5">
                  <div className="h-2 w-full rounded-full bg-[#e5eeff]" />
                  <div className="h-2 w-2/3 rounded-full bg-[#e5eeff]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
