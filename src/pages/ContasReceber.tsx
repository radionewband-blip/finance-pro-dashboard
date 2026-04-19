import { Plus, Download, Banknote, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/finance/PageShell";
import { DataTable, Table, type ColumnDef } from "@/components/finance/DataTable";
import { StatusBadge } from "@/components/finance/StatusBadge";
import { KpiCard } from "@/components/finance/KpiCard";
import { fmtKz, fmtDate } from "@/lib/format";

type Status = "Pendente" | "Vencida" | "Recebida";

interface Receber {
  id: string;
  cliente: string;
  descricao: string;
  vencimento: string;
  valor: number;
  status: Status;
}

const itens: Receber[] = [
  { id: "AR-3082", cliente: "Banco BAI", descricao: "Patrocínio — Programa Manhã", vencimento: "2026-04-30", valor: 1200000, status: "Pendente" },
  { id: "AR-3081", cliente: "Unitel", descricao: "Pacote publicitário · Abril", vencimento: "2026-04-25", valor: 850000, status: "Pendente" },
  { id: "AR-3080", cliente: "Movicel", descricao: "Campanha promocional", vencimento: "2026-04-22", valor: 540000, status: "Pendente" },
  { id: "AR-3079", cliente: "TPA — Televisão", descricao: "Spot publicitário", vencimento: "2026-04-15", valor: 380000, status: "Vencida" },
  { id: "AR-3078", cliente: "Sonangol", descricao: "Patrocínio institucional", vencimento: "2026-04-10", valor: 1500000, status: "Recebida" },
  { id: "AR-3077", cliente: "Banco BFA", descricao: "Spots · Programa Económico", vencimento: "2026-04-08", valor: 420000, status: "Recebida" },
];

const ContasReceber = () => {
  const columns: ColumnDef<Receber>[] = [
    { key: "id", header: "Nº", className: "font-mono w-28", render: (r) => <span className="text-muted-foreground">{r.id}</span> },
    { key: "cliente", header: "Cliente", render: (r) => <span className="font-medium">{r.cliente}</span> },
    { key: "descricao", header: "Descrição", render: (r) => <span className="text-muted-foreground">{r.descricao}</span> },
    { key: "vencimento", header: "Vencimento", render: (r) => <span>{fmtDate(r.vencimento)}</span> },
    {
      key: "status",
      header: "Estado",
      render: (r) => (
        <StatusBadge tone={r.status === "Recebida" ? "success" : r.status === "Vencida" ? "destructive" : "warning"}>
          {r.status}
        </StatusBadge>
      ),
    },
    { key: "valor", header: "Valor", align: "right", render: (r) => <span className="font-semibold tabular-nums text-success">{fmtKz(r.valor)}</span> },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (r) =>
        r.status !== "Recebida" ? (
          <Button size="sm" variant="outline" className="h-7 text-xs">Receber</Button>
        ) : null,
    },
  ];

  const pendente = itens.filter((i) => i.status === "Pendente").reduce((s, i) => s + i.valor, 0);
  const vencido = itens.filter((i) => i.status === "Vencida").reduce((s, i) => s + i.valor, 0);
  const recebido = itens.filter((i) => i.status === "Recebida").reduce((s, i) => s + i.valor, 0);

  return (
    <PageShell
      title="Contas a Receber"
      subtitle="Faturação e cobranças aos clientes"
      actions={
        <>
          <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Exportar</Button>
          <Button size="sm" className="gap-2 bg-gradient-header shadow-brand hover:opacity-95"><Plus className="h-4 w-4" /> Nova Fatura</Button>
        </>
      }
    >
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <KpiCard label="A Receber" value={fmtKz(pendente)} subtitle="dentro do prazo" icon={Clock} variant="warning" />
        <KpiCard label="Em Atraso" value={fmtKz(vencido)} subtitle="cobrança urgente" icon={AlertCircle} variant="destructive" />
        <KpiCard label="Recebido no Mês" value={fmtKz(recebido)} subtitle="entradas confirmadas" icon={Banknote} variant="success" />
      </section>

      <DataTable title="Faturação em Aberto" description={`${itens.length} registos`} searchPlaceholder="Procurar cliente...">
        <Table columns={columns} data={itens} rowKey={(r) => r.id} />
      </DataTable>
    </PageShell>
  );
};

export default ContasReceber;
