import { ReactNode } from "react";
import { AppLayout } from "./AppLayout";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function PageShell({ eyebrow = "Finance Pro · Corporate", title, subtitle, actions, children }: PageShellProps) {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">{eyebrow}</div>
            <h1 className="font-display text-3xl font-bold text-foreground">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>
        {children}
      </div>
    </AppLayout>
  );
}
