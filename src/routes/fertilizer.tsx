import { createFileRoute } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";
import { useState } from "react";
import { Field, PageShell, inputClass, submitClass } from "@/components/site/PageShell";
import { CROPS, SOIL_TYPES, recommendFertilizer, type SoilType } from "@/lib/agri";

export const Route = createFileRoute("/fertilizer")({
  head: () => ({
    meta: [
      { title: "Fertilizer & NPK Recommendation | AgriPredict" },
      { name: "description", content: "Get personalised NPK fertilizer doses, application schedule and field totals for your crop and soil." },
      { property: "og:title", content: "Fertilizer & NPK Recommendation | AgriPredict" },
      { property: "og:description", content: "Optimal crop nutrition plans based on crop, soil, rainfall and growth stage." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Fertilizer,
});

function Fertilizer() {
  const [form, setForm] = useState({
    crop: "Maize",
    soil: "silt" as SoilType,
    rainfall: "1600",
    fieldSize: "1.0",
    stage: "vegetative",
    ph: "alkaline",
  });
  const [result, setResult] = useState<ReturnType<typeof recommendFertilizer> | null>(null);

  return (
    <PageShell icon={FlaskConical} title="Fertilizer Recommendation" subtitle="Get personalized NPK recommendations for optimal crop nutrition">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setResult(
            recommendFertilizer({
              crop: form.crop,
              soil: form.soil,
              rainfall: Number(form.rainfall),
              fieldSize: Number(form.fieldSize),
              stage: form.stage,
              ph: form.ph,
            }),
          );
        }}
        className="grid gap-5 sm:grid-cols-2"
      >
        <Field label="Crop Type *">
          <select className={inputClass} value={form.crop} onChange={(e) => setForm({ ...form, crop: e.target.value })}>
            {CROPS.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Expected Annual Rainfall (mm) *" hint="Enter expected or historical average rainfall">
          <input required type="number" className={inputClass} value={form.rainfall} onChange={(e) => setForm({ ...form, rainfall: e.target.value })} />
        </Field>
        <Field label="Soil Type *">
          <select className={inputClass} value={form.soil} onChange={(e) => setForm({ ...form, soil: e.target.value as SoilType })}>
            {SOIL_TYPES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Field Size (hectares)" hint="Used to calculate total fertilizer quantities">
          <input type="number" step="0.1" className={inputClass} value={form.fieldSize} onChange={(e) => setForm({ ...form, fieldSize: e.target.value })} />
        </Field>
        <Field label="Current Growth Stage">
          <select className={inputClass} value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })}>
            <option value="sowing">Sowing / Basal</option>
            <option value="vegetative">Vegetative Growth</option>
            <option value="flowering">Flowering</option>
            <option value="maturity">Maturity</option>
          </select>
        </Field>
        <Field label="Soil pH (if known)">
          <select className={inputClass} value={form.ph} onChange={(e) => setForm({ ...form, ph: e.target.value })}>
            <option value="acidic">Acidic (&lt; 6.0)</option>
            <option value="neutral">Neutral (6.0 - 7.5)</option>
            <option value="alkaline">Alkaline (&gt; 7.5)</option>
          </select>
        </Field>
        <div className="sm:col-span-2 rounded-xl bg-secondary p-4 text-sm text-secondary-foreground">
          <strong>Quick Tip:</strong> For best results, conduct a soil test to determine exact nutrient levels.
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className={submitClass}>Generate Recommendation</button>
        </div>
      </form>

      {result && (
        <div className="mt-8 rounded-2xl border border-border bg-secondary p-6">
          <h2 className="text-lg font-bold">🧪 Fertilizer Recommendation for {form.crop}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              ["Nitrogen (N)", result.n, result.totals.n],
              ["Phosphorus (P)", result.p, result.totals.p],
              ["Potassium (K)", result.k, result.totals.k],
            ].map(([label, perHa, total]) => (
              <div key={String(label)} className="rounded-2xl bg-card p-5 text-center shadow-soft">
                <p className="text-sm font-semibold text-muted-foreground">{label}</p>
                <p className="mt-2 text-4xl font-extrabold text-primary">{perHa}</p>
                <p className="text-xs text-muted-foreground">kg/ha</p>
                <p className="mt-2 text-xs">Total for field: <strong>{total} kg</strong></p>
              </div>
            ))}
          </div>
          <div className="mt-5 overflow-hidden rounded-xl bg-card">
            <p className="bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Application Schedule</p>
            <p className="px-4 py-3 text-sm">{result.schedule}</p>
          </div>
          <div className="mt-5 rounded-xl bg-card p-4">
            <p className="font-bold">Important Notes</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {result.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </PageShell>
  );
}
