import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bug,
  CloudSun,
  FlaskConical,
  LineChart,
  Search,
  Sparkles,
  Sprout,
  Users,
} from "lucide-react";
import heroFarm from "@/assets/hero-farm.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgriPredict — AI Crop, Yield & Disease Predictions for Farmers" },
      {
        name: "description",
        content:
          "AgriPredict gives farmers AI crop recommendations, yield forecasts, disease risk alerts, fertilizer plans and a 24/7 AI farming assistant.",
      },
      { property: "og:title", content: "AgriPredict — Smart Farming with AI Predictions" },
      {
        property: "og:description",
        content: "AI crop recommendations, yield forecasts, disease alerts and fertilizer guidance in one platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  {
    to: "/crop-recommendation",
    icon: Search,
    title: "Crop Recommendation",
    text: "AI-powered suggestions for the best crops to grow based on your soil, climate and farming conditions.",
  },
  {
    to: "/yield-prediction",
    icon: LineChart,
    title: "Yield Prediction",
    text: "Predict crop yields with high accuracy using weather data, soil conditions and historical patterns.",
  },
  {
    to: "/disease-detection",
    icon: Bug,
    title: "Disease Risk",
    text: "Early detection and prevention of crop diseases to protect your harvest and reduce losses.",
  },
  {
    to: "/fertilizer",
    icon: FlaskConical,
    title: "Fertilizer Guide",
    text: "Personalised NPK recommendations based on crop type, soil condition and growth stage.",
  },
  {
    to: "/farmer-connect",
    icon: Users,
    title: "Farmer Connect",
    text: "Consult certified crop scientists, soil experts and plant protection specialists.",
  },
  {
    to: "/about",
    icon: Sparkles,
    title: "AI Farm Advisor",
    text: "Chat with AgriBot for instant answers on irrigation, pests, markets and season planning.",
  },
] as const;

function Index() {
  return (
    <div>
      <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground">
        <img
          src={heroFarm}
          alt="Aerial view of green terraced farmland at sunrise"
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-24 lg:grid-cols-2 lg:items-center lg:py-32">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              <Sprout className="h-4 w-4" /> Smart farming platform
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Smart Agriculture
              <br />
              with <span className="text-[color:var(--leaf)]">AI Predictions</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg opacity-90">
              Revolutionize your farming with cutting-edge AI. Get accurate crop yield predictions, disease
              alerts, fertilizer recommendations and season planning — all in one platform.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/crop-recommendation"
                className="rounded-full bg-leaf-gradient px-7 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-lift transition hover:scale-[1.03]"
              >
                Start Predicting
              </Link>
              <Link
                to="/about"
                className="rounded-full border border-primary-foreground/40 px-7 py-3 text-sm font-bold uppercase tracking-wide transition hover:bg-primary-foreground/15"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="relative grid gap-4">
            {[
              { icon: Sprout, label: "95% Model Accuracy", cls: "lg:ml-16" },
              { icon: Bug, label: "Disease Detection", cls: "lg:ml-40" },
              { icon: CloudSun, label: "Weather Forecast", cls: "lg:ml-24" },
            ].map((c) => (
              <div
                key={c.label}
                className={`flex items-center gap-3 rounded-2xl bg-card px-5 py-4 text-card-foreground shadow-lift ${c.cls}`}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-leaf-gradient text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="font-semibold">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">AI Services for Every Field</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Six intelligent tools that turn your soil, weather and crop data into clear, profitable decisions.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group rounded-2xl border border-border bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-leaf-gradient text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">
                Try Now →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["95%", "Prediction accuracy"],
            ["10+", "Crops modelled"],
            ["24/7", "AI assistant"],
            ["6", "AI-powered tools"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-2xl bg-card p-8 shadow-soft">
              <p className="text-4xl font-extrabold text-primary">{v}</p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
