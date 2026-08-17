import { createFileRoute } from "@tanstack/react-router";
import { LineChart } from "lucide-react";
import { useState } from "react";
import { Field, PageShell, inputClass, submitClass } from "@/components/site/PageShell";
import { CROPS, predictYield } from "@/lib/agri";

export const Route = createFileRoute("/yield-prediction")({
  head: () => ({
    meta: [
      { title: "Crop Yield Prediction | AgriPredict" },
      { name: "description", content: "Predict crop yield per hectare from rainfall, temperature and pesticide usage with AgriPredict's AI model." },
      { property: "og:title", content: "Crop Yield Prediction | AgriPredict" },
      { property: "og:description", content: "Enter your farm conditions and get accurate yield predictions instantly." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: YieldPrediction,
});

function YieldPrediction() {
  const [form, setForm] = useState({ crop: "Potatoes", rainfall: "700", pesticide: "160", temperature: "36" });
  const [result, setResult] = useState<ReturnType<typeof predictYield> | null>(null);

  return (
    <PageShell icon={LineChart} title="Crop Yield Prediction" subtitle="Enter your farm conditions to get accurate yield predictions">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setResult(
            predictYield({
              crop: form.crop,
              rainfall: Number(form.rainfall),
              pesticide: Number(form.pesticide),
              temperature: Number(form.temperature),
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
        <Field label="Annual Rainfall (mm)">
          <input required type="number" className={inputClass} value={form.rainfall} onChange={(e) => setForm({ ...form, rainfall: e.target.value })} />
        </Field>
        <Field label="Pesticide Usage (kg/ha)">
          <input required type="number" className={inputClass} value={form.pesticide} onChange={(e) => setForm({ ...form, pesticide: e.target.value })} />
        </Field>
        <Field label="Average Temperature (°C)">
          <input required type="number" className={inputClass} value={form.temperature} onChange={(e) => setForm({ ...form, temperature: e.target.value })} />
        </Field>
        <div className="sm:col-span-2">
          <button type="submit" className={submitClass}>Predict Yield</button>
        </div>
      </form>

      {result && (
        <div className="mt-8 rounded-2xl border border-border bg-secondary p-6">
          <h2 className="text-lg font-bold">📈 Yield Prediction Results</h2>
          <p className="mt-3 text-sm"><strong>Crop:</strong> {result.crop}</p>
          <p className="mt-1 text-sm"><strong>Predicted Yield:</strong> {result.yieldValue.toLocaleString()} kg/ha</p>
          <p className="mt-1 text-sm"><strong>Model Confidence:</strong> {result.confidence}%</p>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-card">
            <div className="h-full bg-leaf-gradient" style={{ width: `${result.confidence}%` }} />
          </div>
          <p className="mt-4 text-sm"><strong>Recommendation:</strong> {result.recommendation}</p>
        </div>
      )}
    </PageShell>
  );
}
