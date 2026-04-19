import { Plus, Download, Wallet, ArrowDownRight, ArrowUpRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/finance/PageShell";
import { DataTable, Table, type ColumnDef } from "@/components/finance/DataTable";
import { KpiCard } from "@/components/finance/KpiCard";
import { fmtKz, fmtDate } from "@/lib/format";
import { cn } from "@/lib/utils";

interface Movimento {
  id: string;
  data: string;
  descricao: string;
  contraparte: string;
  tipo: "Entrada" | "Saída";
  valor: number;
  saldo: number;
}

const movimentos: Movimento[] = [
  { id: "MV-501", data: "2026-04-18", descricao: "Recebimento — Unitel", contraparte: "Banco BAI", tipo: "Entrada", valor: 850000, saldo: 8420500 },
  { id: "MV-500", data: "2026-04-17", descricao: "Pagamento Salários", contraparte: "Banco BAI", tipo: "Saída", valor: 620000, saldo: 7570500 },
  { id: "MV-499", data: "2026-04-16", descricao: "Recebimento — Banco BAI", contraparte: "Banco BFA", tipo: "Entrada", valor: 1200000, saldo: 8190500 },
  { id: "MV-498", data: "2026-04-15", descricao: "Pagamento ENDE", contraparte: "Banco BAI", tipo: "Saída", valor: 145000, saldo: 6990500 },
  { id: "MV-497", data: "2026-04-14", descricao: "Recebimento — TPA", contraparte: "Banco BFA", tipo: "Entrada", valor: 380000, saldo: 7135500 },
  { id: "MV-496", data: "2026-04-13", descricao: "Manutenção Estúdio", contraparte: "Caixa Geral", tipo: "Saída", valor: 92000, saldo: 6755500 },
];

const contas = [
  { nome: "Banco BAI · Operacional", numero: "AO06 0040 0000 1234 5678 9", saldo: 5240000 },
  { nome: "Banco BFA · Reserva", numero: "AO06 0006 0000 9876 5432 1", saldo: 2980500 },
  { nome: "Caixa Geral", numero: "—", saldo: 200000 },
];

const ContaCorrente = () => {
  const columns: ColumnDef<Movimento>[] = [
    { key: "id", header: "Nº", className: "font-mono w-24", render: (r) => <span className="text-muted-foreground">{r.id}</span> },
    { key: "data", header: "Data", render: (r) => <span>{fmtDate(r.data)}</span> },
    { key: "descricao", header: "Descrição", render: (r) => <span className="font-medium">{r.descricao}</span> },
    { key: "contraparte", header: "Conta", render: (r) => <span className="text-muted-foreground">{r.contraparte}</span> },
    {
      key: "tipo",
      header: "Tipo",
      render: (r) => (
        <span className={cn("inline-flex items-center gap-1 text-xs font-medium", r.tipo === "Entrada" ? "text-success" : "text-destructive")}>
          {r.tipo === "Entrada" ? <ArrowDownRight className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
          {r.tipo}
        </span>
      ),
    },
    {
      key: "valor",
      header: "Valor",
      align: "right",
      render: (r) => (
        <span className={cn("font-semibold tabular-nums", r.tipo === "Entrada" ? "text-success" : "text-foreground")}>
          {r.tipo === "Entrada" ? "+ " : "− "}
          {fmtKz(r.valor)}
        </span>
      ),
    },
    { key: "saldo", header: "Saldo", align: "right", render: (r) => <span className="font-mono text-muted-foreground tabular-nums">{fmtKz(r.saldo)}</span> },
  ];

  const totalSaldo = contas.reduce((s, c) => s + c.saldo, 0);

  return (
    <PageShell
      title="Conta Corrente"
      subtitle="Posição bancária e movimentos de tesouraria"
      actions={
        <>
          <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Exportar</Button>
          <Button size="sm" className="gap-2 bg-gradient-header shadow-brand hover:opacity-95"><Plus className="h-4 w-4" /> Novo Movimento</Button>
        </>
      }
    >
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard label="Saldo Total" value={fmtKz(totalSaldo)} subtitle="todas as contas" icon={Wallet} variant="primary" />
        {contas.map((c) => (
          <KpiCard key={c.nome} label={c.nome} value={fmtKz(c.saldo)} subtitle={c.numero} icon={CreditCard} variant="success" />
        ))}
      </section>

      <DataTable title="Extracto de Movimentos" description={`${movimentos.length} movimentos · período corrente`} searchPlaceholder="Procurar movimento...">
        <Table columns={columns} data={movimentos} rowKey={(r) => r.id} />
      </DataTable>
    </PageShell>
  );
};

export default ContaCorrente;
