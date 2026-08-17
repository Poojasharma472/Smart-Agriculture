export type SoilType = "loamy" | "clay" | "sandy" | "black" | "red" | "silt";
export type Season = "kharif" | "rabi" | "zaid";

export const SOIL_TYPES: { value: SoilType; label: string }[] = [
  { value: "loamy", label: "Loamy Soil" },
  { value: "clay", label: "Clay Soil" },
  { value: "sandy", label: "Sandy Soil" },
  { value: "black", label: "Black Soil" },
  { value: "red", label: "Red Soil" },
  { value: "silt", label: "Silt Soil" },
];

export const SEASONS: { value: Season; label: string }[] = [
  { value: "kharif", label: "Kharif (Monsoon)" },
  { value: "rabi", label: "Rabi (Winter)" },
  { value: "zaid", label: "Zaid (Summer)" },
];

type CropProfile = {
  name: string;
  rain: [number, number];
  temp: [number, number];
  soils: SoilType[];
  seasons: Season[];
  yieldKg: number;
  cost: number;
  duration: string;
  market: string;
  water: "Low" | "Medium" | "High";
  profit: "moderate" | "high" | "very high";
};

export const CROPS: CropProfile[] = [
  { name: "Maize", rain: [500, 1000], temp: [20, 32], soils: ["loamy", "red", "black"], seasons: ["kharif", "rabi"], yieldKg: 5442, cost: 23802, duration: "90-120 days", market: "Food Grain", water: "Medium", profit: "high" },
  { name: "Rice", rain: [1000, 2000], temp: [22, 35], soils: ["clay", "silt", "loamy"], seasons: ["kharif"], yieldKg: 6200, cost: 32000, duration: "120-150 days", market: "Food Grain", water: "High", profit: "high" },
  { name: "Wheat", rain: [400, 900], temp: [12, 26], soils: ["loamy", "clay", "silt"], seasons: ["rabi"], yieldKg: 4300, cost: 27500, duration: "110-140 days", market: "Food Grain", water: "Medium", profit: "moderate" },
  { name: "Cotton", rain: [500, 1100], temp: [22, 36], soils: ["black", "red", "loamy"], seasons: ["kharif"], yieldKg: 2100, cost: 41000, duration: "150-180 days", market: "Cash Crop", water: "Medium", profit: "high" },
  { name: "Groundnut", rain: [500, 1000], temp: [22, 33], soils: ["sandy", "red", "loamy"], seasons: ["kharif", "zaid"], yieldKg: 2600, cost: 29500, duration: "100-130 days", market: "Oilseed", water: "Low", profit: "high" },
  { name: "Tomato", rain: [600, 1300], temp: [18, 30], soils: ["loamy", "red", "silt"], seasons: ["rabi", "zaid", "kharif"], yieldKg: 42828, cost: 46899, duration: "90-120 days", market: "Vegetable", water: "High", profit: "very high" },
  { name: "Onion", rain: [500, 1100], temp: [15, 30], soils: ["loamy", "silt", "black"], seasons: ["rabi", "kharif"], yieldKg: 28500, cost: 38900, duration: "100-130 days", market: "Vegetable", water: "Medium", profit: "very high" },
  { name: "Sugarcane", rain: [1100, 2200], temp: [21, 38], soils: ["loamy", "clay", "black"], seasons: ["kharif", "zaid"], yieldKg: 78000, cost: 92000, duration: "300-365 days", market: "Cash Crop", water: "High", profit: "high" },
  { name: "Soybean", rain: [600, 1200], temp: [20, 32], soils: ["black", "loamy", "red"], seasons: ["kharif"], yieldKg: 2450, cost: 24800, duration: "95-120 days", market: "Oilseed", water: "Medium", profit: "moderate" },
  { name: "Potatoes", rain: [500, 1000], temp: [12, 25], soils: ["loamy", "sandy", "silt"], seasons: ["rabi"], yieldKg: 24500, cost: 51800, duration: "90-110 days", market: "Vegetable", water: "Medium", profit: "high" },
];

const inRange = (v: number, [lo, hi]: [number, number]) => {
  if (v >= lo && v <= hi) return 1;
  const span = hi - lo;
  const dist = v < lo ? lo - v : v - hi;
  return Math.max(0, 1 - dist / (span || 1));
};

export type CropInput = {
  rainfall: number;
  temperature: number;
  humidity: number;
  soil: SoilType;
  season: Season;
  ph: number;
  farmSize: number;
};

export type CropResult = {
  name: string;
  match: number;
  yieldKg: number;
  investment: number;
  duration: string;
  profit: string;
  market: string;
  water: string;
};

export function recommendCrops(input: CropInput): CropResult[] {
  const phFactor = 1 - Math.min(Math.abs(input.ph - 6.5) / 4, 0.3);
  return CROPS.map((c) => {
    const score =
      inRange(input.rainfall, c.rain) * 0.34 +
      inRange(input.temperature, c.temp) * 0.28 +
      (c.soils.includes(input.soil) ? 1 : 0.42) * 0.2 +
      (c.seasons.includes(input.season) ? 1 : 0.3) * 0.18;
    const match = Math.min(100, Math.round(score * phFactor * 1000) / 10);
    const humidityAdj = 0.85 + Math.min(input.humidity, 100) / 400;
    return {
      name: c.name,
      match,
      yieldKg: Math.round(c.yieldKg * (0.7 + score * 0.45) * humidityAdj),
      investment: Math.round(c.cost * (0.9 + input.farmSize * 0.02)),
      duration: c.duration,
      profit: c.profit,
      market: c.market,
      water: c.water,
    };
  })
    .sort((a, b) => b.match - a.match)
    .slice(0, 6);
}

export type YieldInput = {
  crop: string;
  rainfall: number;
  pesticide: number;
  temperature: number;
};

export function predictYield({ crop, rainfall, pesticide, temperature }: YieldInput) {
  const profile = CROPS.find((c) => c.name === crop) ?? CROPS[0];
  const base = profile.yieldKg;
  const rainScore = inRange(rainfall, profile.rain);
  const tempScore = inRange(temperature, profile.temp);
  const pestScore = 1 - Math.min(Math.abs(pesticide - 120) / 600, 0.25);
  const value = base * (0.55 + rainScore * 0.28 + tempScore * 0.22) * pestScore;
  const confidence = Math.round((rainScore * 0.5 + tempScore * 0.5) * 100);
  const ratio = value / base;
  const recommendation =
    ratio > 1.05
      ? "Excellent yield expected! Continue current practices and consider premium crop varieties."
      : ratio > 0.85
        ? "Good yield expected. Optimise irrigation scheduling and split nitrogen doses for extra gains."
        : "Below-average yield risk. Improve soil moisture, review pesticide load and consider a hardier variety.";
  return { crop: profile.name, yieldValue: Math.round(value * 100) / 100, confidence, recommendation };
}

export type DiseaseInput = {
  crop: string;
  rainfall: number;
  temperature: number;
  humidity: number;
  pesticideDays: number;
  season: string;
};

export function predictDiseaseRisk(i: DiseaseInput) {
  let risk = 0;
  risk += Math.min(i.humidity, 100) * 0.45;
  risk += Math.min(i.rainfall / 4, 25);
  risk += i.temperature >= 20 && i.temperature <= 32 ? 15 : 5;
  risk += i.pesticideDays > 21 ? 14 : i.pesticideDays > 7 ? 7 : 0;
  risk += i.season === "monsoon" ? 8 : 0;
  const score = Math.max(4, Math.min(98, Math.round(risk * 0.75)));
  const level = score > 70 ? "High" : score > 45 ? "Moderate" : "Low";
  const diseases =
    level === "High"
      ? ["Leaf blight", "Powdery mildew", "Root rot"]
      : level === "Moderate"
        ? ["Leaf spot", "Rust"]
        : ["No major threat detected"];
  const actions =
    level === "High"
      ? [
          "Apply a preventive fungicide spray within 48 hours.",
          "Improve field drainage and reduce canopy humidity.",
          "Scout fields every 2-3 days and remove infected foliage.",
        ]
      : level === "Moderate"
        ? [
            "Monitor twice a week for early lesions.",
            "Avoid overhead irrigation in the evening.",
            "Keep a fungicide ready for the next humid spell.",
          ]
        : ["Maintain current practices.", "Continue weekly scouting.", "Keep field sanitation high."];
  return { score, level, diseases, actions };
}

export type FertilizerInput = {
  crop: string;
  soil: SoilType;
  rainfall: number;
  fieldSize: number;
  stage: string;
  ph: string;
};

const NPK_BASE: Record<string, [number, number, number]> = {
  Maize: [120, 60, 40],
  Rice: [100, 50, 50],
  Wheat: [120, 60, 40],
  Cotton: [150, 75, 75],
  Groundnut: [25, 50, 75],
  Tomato: [180, 100, 120],
  Onion: [110, 60, 80],
  Sugarcane: [250, 115, 115],
  Soybean: [30, 60, 40],
  Potatoes: [180, 80, 100],
};

export function recommendFertilizer(i: FertilizerInput) {
  const base = NPK_BASE[i.crop] ?? [120, 60, 40];
  const soilAdj: Record<SoilType, number> = { loamy: 1, clay: 0.95, sandy: 1.15, black: 0.9, red: 1.08, silt: 1 };
  const rainAdj = i.rainfall > 1200 ? 1.1 : i.rainfall < 600 ? 0.92 : 1;
  const phAdj = i.ph === "acidic" ? 1.08 : i.ph === "alkaline" ? 1.05 : 1;
  const stageAdj = i.stage === "vegetative" ? 1.05 : i.stage === "flowering" ? 0.95 : 1;
  const f = soilAdj[i.soil] * rainAdj * phAdj * stageAdj;
  const n = Math.round(base[0] * f);
  const p = Math.round(base[1] * f);
  const k = Math.round(base[2] * f);
  return {
    n,
    p,
    k,
    totals: {
      n: Math.round(n * i.fieldSize),
      p: Math.round(p * i.fieldSize),
      k: Math.round(k * i.fieldSize),
    },
    schedule: "40% N&K basal, 40% at 25 days, 20% at 45 days. All P basal.",
    notes: [
      "These are general recommendations. Always conduct soil testing for precise needs.",
      "Apply fertilizers based on weather conditions and soil moisture.",
      "Add 5-10 t/ha of well-decomposed farmyard manure before sowing.",
    ],
  };
}
