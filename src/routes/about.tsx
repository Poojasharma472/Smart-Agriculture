import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AgriPredict — AI for Smarter Farming" },
      { name: "description", content: "AgriPredict combines agronomy science and AI to help farmers pick crops, forecast yields, prevent disease and plan nutrition." },
      { property: "og:title", content: "About AgriPredict — AI for Smarter Farming" },
      { property: "og:description", content: "Our mission: put affordable agricultural intelligence in every farmer's hand." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight">
        <Info className="h-8 w-8 text-primary" /> About AgriPredict
      </h1>
      <p className="mt-5 text-muted-foreground">
        AgriPredict turns weather, soil and crop data into clear farming decisions. Our models blend agronomy
        research with machine learning so that every farmer — whether on half a hectare or fifty — can plan a
        season with confidence.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {[
          ["Our Mission", "Make agricultural intelligence affordable, local and understandable for every farmer."],
          ["How It Works", "You enter field conditions; our models score crops, forecast yield, flag disease risk and size nutrient doses."],
          ["AI Assistant", "AgriBot answers questions in plain language, 24/7, from the chat bubble at the bottom-left."],
          ["Trust & Safety", "Recommendations are advisory. Always confirm with a soil test or your local agronomist."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-bold">{t}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
