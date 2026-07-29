import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const socials = [
  { icon: BsTwitterX, label: "Twitter", size: 16 },
  { icon: FaFacebook, label: "Facebook", size: 18 },
  { icon: FaGithub, label: "GitHub", size: 18 },
  { icon: FaLinkedin, label: "LinkedIn", size: 18 },
];

const columns = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Support", "Press"],
  },
  {
    title: "Resources",
    links: [
      "Rental Guide",
      "Landlord Tips",
      "Market Insights",
      "Trust & Safety",
    ],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-white rounded-3xl shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] px-8 md:px-12 pt-12 pb-8">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          {/* Brand */}
          <div>
            <h2 className="font-bold text-2xl text-[#0b1c30] mb-3">RentNest</h2>
            <p className="text-sm text-[#515f74] leading-relaxed max-w-65 mb-5">
              Redefining the rental experience through trust, quality, and
              technical precision.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, size }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff] transition-colors"
                >
                  <Icon size={size} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map(({ title, links }) => (
            <div key={title}>
              <h3 className="font-semibold text-sm text-[#0b1c30] mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#006c49] hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#e5eeff] text-center">
          <p className="text-sm text-[#515f74]">
            © 2024 RentNest. All rights reserved. Crafted for better{" "}
            <span className="text-[#006c49]">living</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
