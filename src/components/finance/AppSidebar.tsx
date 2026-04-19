import {
  LayoutDashboard,
  BookOpen,
  ArrowLeftRight,
  Receipt,
  Banknote,
  Wallet,
  FileBarChart2,
  Briefcase,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Painel", url: "/", icon: LayoutDashboard },
  { title: "Plano de Contas", url: "/plano-contas", icon: BookOpen },
  { title: "Lançamentos", url: "/lancamentos", icon: ArrowLeftRight },
];

const operationItems = [
  { title: "Contas a Pagar", url: "/pagar", icon: Receipt },
  { title: "Contas a Receber", url: "/receber", icon: Banknote },
  { title: "Conta Corrente", url: "/conta-corrente", icon: Wallet },
];

const reportItems = [{ title: "DRE", url: "/dre", icon: FileBarChart2 }];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const renderItems = (items: typeof mainItems) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild tooltip={item.title}>
            <NavLink
              to={item.url}
              end
              className="text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeClassName="bg-sidebar-primary text-sidebar-primary-foreground font-medium"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gradient-header shadow-brand">
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-sidebar-foreground">Finance Pro</span>
              <span className="text-[11px] text-sidebar-foreground/60">Corporate Edition</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Geral</SidebarGroupLabel>}
          <SidebarGroupContent>{renderItems(mainItems)}</SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Operações</SidebarGroupLabel>}
          <SidebarGroupContent>{renderItems(operationItems)}</SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Relatórios</SidebarGroupLabel>}
          <SidebarGroupContent>{renderItems(reportItems)}</SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
