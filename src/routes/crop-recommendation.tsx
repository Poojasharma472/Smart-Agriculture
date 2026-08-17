import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { Field, PageShell, inputClass, submitClass } from "@/components/site/PageShell";
import { SEASONS, SOIL_TYPES, recommendCrops, type CropResult, type Season, type SoilType } from "@/lib/agri";

export const Route = createFileRoute("/crop-recommendation")({
  head: () => ({
    meta: [
      { title: "Smart Crop Recommendation | AgriPredict" },
      {
        name: "description",
        content: "Get AI crop recommendations ranked by match score, expected yield, investment and profit potential.",
      },
      { property: "og:title", content: "Smart Crop Recommendation | AgriPredict" },
      { property: "og:description", content: "Personalised crop suggestions from your soil, rainfall and season data." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CropRecommendation,
});

function CropRecommendation() {
  const [form, setForm] = useState({
    rainfall: "850",
    temperature: "26",
    humidity: "70",
    soil: "red" as SoilType,
    season: "zaid" as Season,
    ph: "7.0",
    farmSize: "1.0",
  });
  const [results, setResults] = useState<CropResult[] | null>(null);

  return (
    <PageShell
      icon={Search}
      title="Smart Crop Recommendation"
      subtitle="Get personalized crop suggestions based on your location and farming conditions"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setResults(
            recommendCrops({
              rainfall: Number(form.rainfall),
              temperature: Number(form.temperature),
              humidity: Number(form.humidity),
              soil: form.soil,
              season: form.season,
              ph: Number(form.ph),
              farmSize: Number(form.farmSize),
            }),
          );
        }}
        className="grid gap-5 sm:grid-cols-2"
      >
        <Field label="Expected Annual Rainfall (mm) *" hint="Historical average or meteorological forecast">
          <input required type="number" className={inputClass} value={form.rainfall} onChange={(e) => setForm({ ...form, rainfall: e.target.value })} />
        </Field>
        <Field label="Average Temperature (°C) *" hint="Annual average temperature">
          <input required type="number" className={inputClass} value={form.temperature} onChange={(e) => setForm({ ...form, temperature: e.target.value })} />
        </Field>
        <Field label="Average Humidity (%) *">
          <input required type="number" className={inputClass} value={form.humidity} onChange={(e) => setForm({ ...form, humidity: e.target.value })} />
        </Field>
        <Field label="Soil Type *">
          <select className={inputClass} value={form.soil} onChange={(e) => setForm({ ...form, soil: e.target.value as SoilType })}>
            {SOIL_TYPES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Soil pH Level" hint="If unknown, leave as 7.0 (neutral)">
          <input type="number" step="0.1" className={inputClass} value={form.ph} onChange={(e) => setForm({ ...form, ph: e.target.value })} />
        </Field>
        <Field label="Preferred Season *">
          <select className={inputClass} value={form.season} onChange={(e) => setForm({ ...form, season: e.target.value as Season })}>
            {SEASONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Farm Size (hectares)">
          <input type="number" step="0.1" className={inputClass} value={form.farmSize} onChange={(e) => setForm({ ...form, farmSize: e.target.value })} />
        </Field>
        <div className="sm:col-span-2">
          <button type="submit" className={submitClass}>Get Recommendations</button>
        </div>
      </form>

      {results && (
        <div className="mt-10 rounded-2xl border border-border bg-secondary p-5">
          <h2 className="text-lg font-bold">🌱 Crop Recommendations for Your Farm</h2>
          <p className="mt-3 rounded-xl bg-card p-3 text-sm">
            <strong>Analysis Parameters:</strong> Rainfall: {form.rainfall}mm, Temperature: {form.temperature}°C, Soil:{" "}
            {form.soil}, Season: {form.season}
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {results.map((r) => (
              <article key={r.name} className="rounded-2xl bg-card p-5 shadow-soft">
                <header className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">{r.name}</h3>
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    {r.match}% Match
                  </span>
                </header>
                <p className="mt-2 text-sm font-semibold text-primary">
                  {r.match > 85 ? "Highly Recommended" : r.match > 65 ? "Recommended" : "Possible with care"}
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div><dt className="text-muted-foreground">Expected Yield</dt><dd className="font-bold">{r.yieldKg.toLocaleString()} kg/ha</dd></div>
                  <div><dt className="text-muted-foreground">Investment</dt><dd className="font-bold">₹{r.investment.toLocaleString()}/ha</dd></div>
                  <div><dt className="text-muted-foreground">Duration</dt><dd className="font-bold">{r.duration}</dd></div>
                  <div><dt className="text-muted-foreground">Profit Potential</dt><dd><span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">{r.profit}</span></dd></div>
                </dl>
                <p className="mt-3 text-sm text-muted-foreground">
                  Market Type: <strong className="text-foreground">{r.market}</strong> · Water Need:{" "}
                  <strong className="text-foreground">{r.water}</strong>
                </p>
              </article>
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
}
