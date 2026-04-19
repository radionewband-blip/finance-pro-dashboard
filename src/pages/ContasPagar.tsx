import { Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/finance/PageShell";
import { DataTable, Table, type ColumnDef } from "@/components/finance/DataTable";
import { StatusBadge } from "@/components/finance/StatusBadge";
import { KpiCard } from "@/components/finance/KpiCard";
import { fmtKz, fmtDate } from "@/lib/format";
import { Receipt, AlertCircle, Clock } from "lucide-react";

type Status = "Pendente" | "Vencida" | "Paga";

interface Pagar {
  id: string;
  fornecedor: string;
  descricao: string;
  vencimento: string;
  valor: number;
  status: Status;
}

const itens: Pagar[] = [
  { id: "AP-2041", fornecedor: "ENDE — Empresa Nacional", descricao: "Energia eléctrica · Abril", vencimento: "2026-04-25", valor: 145000, status: "Pendente" },
  { id: "AP-2040", fornecedor: "EPAL", descricao: "Água · Abril", vencimento: "2026-04-22", valor: 38000, status: "Pendente" },
  { id: "AP-2039", fornecedor: "Unitel Empresas", descricao: "Comunicações móveis", vencimento: "2026-04-20", valor: 95000, status: "Vencida" },
  { id: "AP-2038", fornecedor: "TV Cabo Angola", descricao: "Internet dedicada 100Mbps", vencimento: "2026-04-30", valor: 78000, status: "Pendente" },
  { id: "AP-2037", fornecedor: "Distribuidora Equipamentos", descricao: "Manutenção transmissor FM", vencimento: "2026-04-15", valor: 215000, status: "Vencida" },
  { id: "AP-2036", fornecedor: "Auto Soares", descricao: "Combustível · Frota", vencimento: "2026-04-10", valor: 62000, status: "Paga" },
];

const ContasPagar = () => {
  const columns: ColumnDef<Pagar>[] = [
    { key: "id", header: "Nº", className: "font-mono w-28", render: (r) => <span className="text-muted-foreground">{r.id}</span> },
    { key: "fornecedor", header: "Fornecedor", render: (r) => <span className="font-medium">{r.fornecedor}</span> },
    { key: "descricao", header: "Descrição", render: (r) => <span className="text-muted-foreground">{r.descricao}</span> },
    { key: "vencimento", header: "Vencimento", render: (r) => <span>{fmtDate(r.vencimento)}</span> },
    {
      key: "status",
      header: "Estado",
      render: (r) => (
        <StatusBadge tone={r.status === "Paga" ? "success" : r.status === "Vencida" ? "destructive" : "warning"}>
          {r.status}
        </StatusBadge>
      ),
    },
    { key: "valor", header: "Valor", align: "right", render: (r) => <span className="font-semibold tabular-nums">{fmtKz(r.valor)}</span> },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (r) =>
        r.status !== "Paga" ? (
          <Button size="sm" variant="outline" className="h-7 text-xs">Liquidar</Button>
        ) : null,
    },
  ];

  const pendente = itens.filter((i) => i.status === "Pendente").reduce((s, i) => s + i.valor, 0);
  const vencido = itens.filter((i) => i.status === "Vencida").reduce((s, i) => s + i.valor, 0);
  const pago = itens.filter((i) => i.status === "Paga").reduce((s, i) => s + i.valor, 0);

  return (
    <PageShell
      title="Contas a Pagar"
      subtitle="Compromissos financeiros com fornecedores"
      actions={
        <>
          <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Exportar</Button>
          <Button size="sm" className="gap-2 bg-gradient-header shadow-brand hover:opacity-95"><Plus className="h-4 w-4" /> Nova Despesa</Button>
        </>
      }
    >
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <KpiCard label="Pendente" value={fmtKz(pendente)} subtitle="a vencer" icon={Clock} variant="warning" />
        <KpiCard label="Vencido" value={fmtKz(vencido)} subtitle="acção urgente" icon={AlertCircle} variant="destructive" />
        <KpiCard label="Pago no Mês" value={fmtKz(pago)} subtitle="liquidações concluídas" icon={Receipt} variant="success" />
      </section>

      <DataTable title="Compromissos em Aberto" description={`${itens.length} registos`} searchPlaceholder="Procurar fornecedor...">
        <Table columns={columns} data={itens} rowKey={(r) => r.id} />
      </DataTable>
    </PageShell>
  );
};

export default ContasPagar;
