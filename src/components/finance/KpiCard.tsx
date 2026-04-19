import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "success" | "destructive" | "warning";

interface KpiCardProps {
  label: string;
  value: string;
  subtitle?: string;
  trend?: { value: string; direction: "up" | "down" };
  icon: LucideIcon;
  variant?: Variant;
}

const accentMap: Record<Variant, string> = {
  primary: "border-l-primary [&_.kpi-icon]:bg-accent [&_.kpi-icon]:text-accent-foreground",
  success: "border-l-success [&_.kpi-icon]:bg-success/10 [&_.kpi-icon]:text-success",
  destructive: "border-l-destructive [&_.kpi-icon]:bg-destructive/10 [&_.kpi-icon]:text-destructive",
  warning: "border-l-warning [&_.kpi-icon]:bg-warning/15 [&_.kpi-icon]:text-warning",
};

export function KpiCard({ label, value, subtitle, trend, icon: Icon, variant = "primary" }: KpiCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-gradient-card border border-border border-l-4 rounded-lg p-5 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 animate-fade-in",
        accentMap[variant]
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <div className="kpi-icon h-9 w-9 rounded-md flex items-center justify-center">
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="font-display text-3xl font-bold text-foreground tabular-nums leading-tight">
        {value}
      </div>

      <div className="mt-2 flex items-center gap-2 text-xs">
        {trend && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium px-1.5 py-0.5 rounded",
              trend.direction === "up" ? "text-success bg-success/10" : "text-destructive bg-destructive/10"
            )}
          >
            {trend.direction === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trend.value}
          </span>
        )}
        {subtitle && <span className="text-muted-foreground">{subtitle}</span>}
      </div>
    </div>
  );
}
