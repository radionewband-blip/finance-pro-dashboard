import { useState } from "react";
import { Plus, Download, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/finance/PageShell";
import { DataTable, Table, type ColumnDef } from "@/components/finance/DataTable";
import { NovoLancamentoDialog } from "@/components/finance/NovoLancamentoDialog";
import { fmtKz, fmtDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useLancamentos, type Lancamento } from "@/stores/lancamentos";

const Lancamentos = () => {
  const [open, setOpen] = useState(false);
  const lancamentos = useLancamentos((s) => s.items);

  const columns: ColumnDef<Lancamento>[] = [
    { key: "id", header: "Nº", className: "font-mono w-28", render: (r) => <span className="text-muted-foreground">{r.id}</span> },
    { key: "data", header: "Data", render: (r) => <span className="text-muted-foreground">{fmtDate(r.data)}</span> },
    { key: "conta", header: "Conta", render: (r) => <span className="font-mono text-xs">{r.conta}</span> },
    { key: "descricao", header: "Descrição", render: (r) => <span className="font-medium">{r.descricao}</span> },
    { key: "documento", header: "Documento", render: (r) => <span className="text-muted-foreground font-mono text-xs">{r.documento}</span> },
    {
      key: "tipo",
      header: "Tipo",
      render: (r) => (
        <span className={cn("inline-flex items-center gap-1 text-xs font-medium", r.tipo === "Crédito" ? "text-success" : "text-destructive")}>
          {r.tipo === "Crédito" ? <ArrowDownRight className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
          {r.tipo}
        </span>
      ),
    },
    {
      key: "valor",
      header: "Valor",
      align: "right",
      render: (r) => (
        <span className={cn("font-semibold tabular-nums", r.tipo === "Crédito" ? "text-success" : "text-foreground")}>
          {r.tipo === "Crédito" ? "+ " : "− "}
          {fmtKz(r.valor)}
        </span>
      ),
    },
  ];

  const totalCredito = lancamentos.filter((l) => l.tipo === "Crédito").reduce((s, l) => s + l.valor, 0);
  const totalDebito = lancamentos.filter((l) => l.tipo === "Débito").reduce((s, l) => s + l.valor, 0);

  return (
    <PageShell
      title="Lançamentos"
      subtitle="Registo cronológico de todas as movimentações contabilísticas"
      actions={
        <>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Exportar
          </Button>
          <Button
            size="sm"
            className="gap-2 bg-gradient-header shadow-brand hover:opacity-95"
            onClick={() => setOpen(true)}
          >
            <Plus className="h-4 w-4" /> Novo Lançamento
          </Button>
        </>
      }
    >
      <DataTable
        title="Diário de Lançamentos"
        description={`${lancamentos.length} movimentos · período corrente`}
        searchPlaceholder="Procurar lançamento..."
        footer={
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <span>Total Créditos: <strong className="text-success font-mono">{fmtKz(totalCredito)}</strong></span>
            <span>Total Débitos: <strong className="text-destructive font-mono">{fmtKz(totalDebito)}</strong></span>
            <span>Saldo: <strong className="text-primary font-mono">{fmtKz(totalCredito - totalDebito)}</strong></span>
          </div>
        }
      >
        <Table columns={columns} data={lancamentos} rowKey={(r) => r.id} />
      </DataTable>

      <NovoLancamentoDialog open={open} onOpenChange={setOpen} />
    </PageShell>
  );
};

export default Lancamentos;
