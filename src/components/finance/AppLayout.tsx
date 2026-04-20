import { ReactNode } from "react";
import { Bell, Search } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { EmpresaSwitcher } from "./EmpresaSwitcher";
import { UserMenu } from "./UserMenu";
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
          <header className="h-16 border-b border-border bg-card flex items-center gap-3 px-4 md:px-6 sticky top-0 z-30 shadow-sm">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

            <EmpresaSwitcher />

            <div className="hidden lg:flex items-center flex-1 max-w-sm relative">
              <Search className="h-4 w-4 absolute left-3 text-muted-foreground" />
              <Input
                placeholder="Pesquisar..."
                className="pl-9 bg-muted/50 border-transparent focus-visible:bg-background h-9"
              />
            </div>

            <div className="flex-1 lg:hidden" />

            <div className="hidden md:block text-right pr-2 border-r border-border">
              <div className="text-xs text-muted-foreground">{periodoCap}</div>
            </div>

            <button className="relative h-9 w-9 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
            </button>

            <UserMenu />
          </header>

          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
