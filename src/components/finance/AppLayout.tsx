import { ReactNode } from "react";
import { Bell, Search, ChevronDown } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Input } from "@/components/ui/input";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const periodo = new Intl.DateTimeFormat("pt-PT", { month: "long", year: "numeric" }).format(new Date());
  const periodoCap = periodo.charAt(0).toUpperCase() + periodo.slice(1);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top header */}
          <header className="h-16 border-b border-border bg-card flex items-center gap-4 px-4 md:px-6 sticky top-0 z-30 shadow-sm">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

            <div className="hidden md:flex items-center flex-1 max-w-md relative">
              <Search className="h-4 w-4 absolute left-3 text-muted-foreground" />
              <Input
                placeholder="Pesquisar transações, contas, fornecedores..."
                className="pl-9 bg-muted/50 border-transparent focus-visible:bg-background"
              />
            </div>

            <div className="flex-1 md:hidden" />

            <button className="relative h-9 w-9 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-border">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold leading-tight">Radio New Band</div>
                <div className="text-xs text-muted-foreground">{periodoCap}</div>
              </div>
              <div className="h-9 w-9 rounded-full bg-gradient-header text-primary-foreground flex items-center justify-center text-sm font-semibold shadow-brand">
                RN
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
            </div>
          </header>

          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
