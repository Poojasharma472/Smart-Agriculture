import { createFileRoute } from "@tanstack/react-router";
import { Bug } from "lucide-react";
import { useState } from "react";
import { Field, PageShell, inputClass, submitClass } from "@/components/site/PageShell";
import { CROPS, predictDiseaseRisk } from "@/lib/agri";

export const Route = createFileRoute("/disease-detection")({
  head: () => ({
    meta: [
      { title: "Disease Risk Prediction | AgriPredict" },
      { name: "description", content: "Assess crop disease risk from humidity, rainfall, temperature and spray history, with prevention actions." },
      { property: "og:title", content: "Disease Risk Prediction | AgriPredict" },
      { property: "og:description", content: "Early warning for crop diseases based on your field's environmental conditions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DiseaseDetection,
});

function DiseaseDetection() {
  const [form, setForm] = useState({
    crop: "Soybean",
    rainfall: "150",
    temperature: "28",
    humidity: "75",
    pesticideDays: "5",
    season: "monsoon",
  });
  const [result, setResult] = useState<ReturnType<typeof predictDiseaseRisk> | null>(null);

  return (
    <PageShell icon={Bug} title="Disease Risk Prediction" subtitle="Assess disease risk for your crops based on environmental conditions">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setResult(
            predictDiseaseRisk({
              crop: form.crop,
              rainfall: Number(form.rainfall),
              temperature: Number(form.temperature),
              humidity: Number(form.humidity),
              pesticideDays: Number(form.pesticideDays),
              season: form.season,
            }),
          );
        }}
        className="grid gap-5 sm:grid-cols-2"
      >
        <Field label="Crop Type">
          <select className={inputClass} value={form.crop} onChange={(e) => setForm({ ...form, crop: e.target.value })}>
            {CROPS.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Recent Rainfall (mm)">
          <input required type="number" className={inputClass} value={form.rainfall} onChange={(e) => setForm({ ...form, rainfall: e.target.value })} />
        </Field>
        <Field label="Average Temperature (°C)">
          <input required type="number" className={inputClass} value={form.temperature} onChange={(e) => setForm({ ...form, temperature: e.target.value })} />
        </Field>
        <Field label="Humidity (%)">
          <input required type="number" className={inputClass} value={form.humidity} onChange={(e) => setForm({ ...form, humidity: e.target.value })} />
        </Field>
        <Field label="Recent Pesticide Application (days ago)">
          <select className={inputClass} value={form.pesticideDays} onChange={(e) => setForm({ ...form, pesticideDays: e.target.value })}>
            <option value="5">0-7 days (Recent)</option>
            <option value="14">8-21 days</option>
            <option value="30">Over 21 days</option>
          </select>
        </Field>
        <Field label="Current Season">
          <select className={inputClass} value={form.season} onChange={(e) => setForm({ ...form, season: e.target.value })}>
            <option value="monsoon">Monsoon</option>
            <option value="winter">Winter</option>
            <option value="summer">Summer</option>
          </select>
        </Field>
        <div className="sm:col-span-2 rounded-xl bg-secondary p-4 text-sm text-secondary-foreground">
          <strong>Tip:</strong> Higher humidity and moderate temperatures often increase disease risk. Regular
          monitoring is essential during monsoon season.
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className={submitClass}>Assess Disease Risk</button>
        </div>
      </form>

      {result && (
        <div className="mt-8 rounded-2xl border border-border bg-secondary p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Disease Risk: {result.level}</h2>
            <span className="rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">{result.score}/100</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-card">
            <div className="h-full bg-leaf-gradient" style={{ width: `${result.score}%` }} />
          </div>
          <h3 className="mt-5 font-bold">Likely threats</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {result.diseases.map((d) => (
              <li key={d} className="rounded-full bg-card px-3 py-1 text-sm">{d}</li>
            ))}
          </ul>
          <h3 className="mt-5 font-bold">Recommended actions</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {result.actions.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      )}
    </PageShell>
  );
}
