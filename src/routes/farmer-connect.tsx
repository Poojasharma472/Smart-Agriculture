import { createFileRoute } from "@tanstack/react-router";
import { Bug, GraduationCap, Leaf, Microscope } from "lucide-react";

export const Route = createFileRoute("/farmer-connect")({
  head: () => ({
    meta: [
      { title: "Farmer Connect — Agricultural Experts | AgriPredict" },
      { name: "description", content: "Consult certified crop scientists, soil experts and plant protection specialists through AgriPredict Farmer Connect." },
      { property: "og:title", content: "Farmer Connect — Agricultural Experts | AgriPredict" },
      { property: "og:description", content: "Professional guidance from certified agricultural experts for your farm." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FarmerConnect,
});

const categories = [
  { icon: Microscope, title: "Crop Scientists", text: "Specialized in crop breeding, genetics and variety development", tags: ["Plant Breeding", "Genetics", "Varieties"] },
  { icon: Leaf, title: "Soil Experts", text: "Experts in soil health, nutrition management and fertility", tags: ["Soil Testing", "Fertility", "Nutrition"] },
  { icon: Bug, title: "Plant Protection", text: "Specialists in pest management and disease control", tags: ["IPM", "Disease Control", "Pest Management"] },
];

const experts = [
  { name: "Dr. Anita Rao", role: "Senior Agronomist", exp: "18 yrs", focus: "Rice & Maize systems" },
  { name: "Dr. Vikram Patel", role: "Soil Scientist", exp: "12 yrs", focus: "Black soil fertility" },
  { name: "Dr. Meera Nair", role: "Plant Pathologist", exp: "15 yrs", focus: "Fungal disease control" },
  { name: "Rajesh Kumar", role: "Horticulture Expert", exp: "10 yrs", focus: "Tomato & onion" },
];

function FarmerConnect() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="text-center">
        <h1 className="flex items-center justify-center gap-3 text-3xl font-extrabold tracking-tight">
          <GraduationCap className="h-8 w-8 text-primary" /> Agricultural Experts
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Get professional guidance from certified agricultural experts</p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {categories.map((c) => (
          <div key={c.title} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <div className="bg-leaf-gradient px-6 py-6 text-center text-primary-foreground">
              <c.icon className="mx-auto h-8 w-8" />
              <h2 className="mt-2 text-lg font-bold">{c.title}</h2>
            </div>
            <div className="p-6 text-center">
              <p className="text-sm text-muted-foreground">{c.text}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{t}</span>
                ))}
              </div>
              <button className="mt-5 rounded-full bg-primary px-6 py-2 text-sm font-bold text-primary-foreground transition hover:opacity-90">
                Consult Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-extrabold">Featured Experts</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {experts.map((e) => (
          <div key={e.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-leaf-gradient text-lg font-bold text-primary-foreground">
              {e.name.charAt(0)}
            </div>
            <h3 className="mt-4 font-bold">{e.name}</h3>
            <p className="text-sm text-primary">{e.role}</p>
            <p className="mt-2 text-xs text-muted-foreground">Experience: {e.exp}</p>
            <p className="text-xs text-muted-foreground">Focus: {e.focus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
