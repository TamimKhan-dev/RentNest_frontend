import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavSection } from "./sidebar";



export default function SidebarContent({
  sections,
  onNavigate,
}: {
  sections: NavSection[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6">
      {sections.map((section) => (
        <div key={section.label}>
          <p className="text-[11px] font-semibold tracking-wide uppercase text-[#94a3b8] px-3 mb-2">
            {section.label}
          </p>
          <div className="flex flex-col gap-1">
            {section.items.map(({ label, icon: Icon, href }) => {
              const active = pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={onNavigate}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#d7f5e9] text-[#006c49]"
                      : "text-[#515f74] hover:bg-[#f8f9ff]"
                  }`}
                >
                  <Icon size={17} />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
