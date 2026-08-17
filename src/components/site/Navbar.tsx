import { Link } from "@tanstack/react-router";
import { Info, Leaf, Menu, Sprout, Users, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home", icon: Sprout },
  { to: "/crop-recommendation", label: "Crop AI", icon: Leaf },
  { to: "/yield-prediction", label: "Yield", icon: Leaf },
  { to: "/disease-detection", label: "Disease", icon: Leaf },
  { to: "/fertilizer", label: "Fertilizer", icon: Leaf },
  { to: "/farmer-connect", label: "Farmer Connect", icon: Users },
  { to: "/about", label: "About", icon: Info },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-hero-gradient text-primary-foreground shadow-soft">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
          <Sprout className="h-7 w-7" />
          AgriPredict
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "bg-primary-foreground/15" }}
              className="rounded-full px-4 py-2 text-sm font-semibold opacity-90 transition hover:bg-primary-foreground/15 hover:opacity-100"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          className="rounded-md p-2 hover:bg-primary-foreground/15 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="grid gap-1 px-4 pb-4 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-primary-foreground/15"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
