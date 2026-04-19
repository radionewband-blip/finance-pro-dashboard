import { TrendingUp, TrendingDown, Wallet, BarChart3, Download, Plus } from "lucide-react";
import { AppLayout } from "@/components/finance/AppLayout";
import { KpiCard } from "@/components/finance/KpiCard";
import { RevenueChart } from "@/components/finance/RevenueChart";
import { RecentTransactions } from "@/components/finance/RecentTransactions";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
        {/* Page header */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
              Finance Pro · Corporate
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">Painel de Controlo</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Visão geral financeira da rádio · Período corrente
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button size="sm" className="gap-2 bg-gradient-header shadow-brand hover:opacity-95">
              <Plus className="h-4 w-4" />
              Novo Lançamento
            </Button>
          </div>
        </header>

        {/* KPI grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <KpiCard
            label="Receitas do Mês"
            value="3.120.000 Kz"
            subtitle="vs. mês anterior"
            trend={{ value: "+8,2%", direction: "up" }}
            icon={TrendingUp}
            variant="success"
          />
          <KpiCard
            label="Despesas do Mês"
            value="1.950.000 Kz"
            subtitle="custos operacionais"
            trend={{ value: "+6,7%", direction: "up" }}
            icon={TrendingDown}
            variant="destructive"
          />
          <KpiCard
            label="Resultado Líquido"
            value="1.170.000 Kz"
            subtitle="margem 37,5%"
            trend={{ value: "+10,4%", direction: "up" }}
            icon={BarChart3}
            variant="primary"
          />
          <KpiCard
            label="Saldo Bancário"
            value="8.420.500 Kz"
            subtitle="3 contas activas"
            icon={Wallet}
            variant="warning"
          />
        </section>

        {/* Chart + activity */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-card border border-border rounded-lg shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h2 className="font-semibold text-base text-foreground">Receitas vs. Despesas</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Últimos 7 meses · em milhões Kz</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Receitas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-destructive" />
                  <span className="text-muted-foreground">Despesas</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <RevenueChart />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h2 className="font-semibold text-base text-foreground">Transacções Recentes</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Últimos lançamentos</p>
              </div>
              <button className="text-xs font-medium text-primary hover:underline">Ver todas</button>
            </div>
            <div className="px-6 py-2">
              <RecentTransactions />
            </div>
          </div>
        </section>

        {/* Footer status */}
        <section className="bg-gradient-card border border-border rounded-lg px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
            </span>
            <span className="text-sm font-medium text-foreground">Sistema Financeiro Operacional</span>
          </div>
          <span className="text-xs text-muted-foreground">
            Finance Pro Corporate Edition · Sistema de gestão financeira profissional
          </span>
        </section>
      </div>
    </AppLayout>
  );
};

export default Index;
