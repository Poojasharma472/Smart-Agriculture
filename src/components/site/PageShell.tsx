import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function PageShell({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
        <div className="text-center">
          <h1 className="flex items-center justify-center gap-3 text-3xl font-extrabold tracking-tight">
            <Icon className="h-8 w-8 text-primary" />
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring";

export const submitClass =
  "mx-auto flex items-center justify-center gap-2 rounded-full bg-leaf-gradient px-8 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-lift transition hover:scale-[1.03] disabled:opacity-60";
