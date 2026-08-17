import { Link } from "@tanstack/react-router";
import { Sprout } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 bg-hero-gradient text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-lg font-extrabold">
            <Sprout className="h-6 w-6" /> AgriPredict
          </div>
          <p className="mt-3 text-sm opacity-80">
            AI-powered decision support for smarter, more profitable and climate-resilient farming.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide opacity-90">AI Services</h3>
          <ul className="mt-3 space-y-2 text-sm opacity-80">
            <li><Link to="/crop-recommendation" className="hover:underline">Crop Recommendation</Link></li>
            <li><Link to="/yield-prediction" className="hover:underline">Yield Prediction</Link></li>
            <li><Link to="/disease-detection" className="hover:underline">Disease Risk</Link></li>
            <li><Link to="/fertilizer" className="hover:underline">Fertilizer Guide</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide opacity-90">Community</h3>
          <ul className="mt-3 space-y-2 text-sm opacity-80">
            <li><Link to="/farmer-connect" className="hover:underline">Farmer Connect</Link></li>
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide opacity-90">Ask AgriBot</h3>
          <p className="mt-3 text-sm opacity-80">
            Tap the chat bubble at the bottom-left corner for instant AI farming advice, 24/7.
          </p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-5 text-center text-xs opacity-75">
        © {new Date().getFullYear()} AgriPredict. Built for farmers.
      </div>
    </footer>
  );
}
