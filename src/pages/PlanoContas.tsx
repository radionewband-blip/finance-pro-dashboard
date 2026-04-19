import { Plus, Download, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/finance/PageShell";
import { DataTable, Table, type ColumnDef } from "@/components/finance/DataTable";

interface Conta {
  codigo: string;
  nome: string;
  tipo: "Activo" | "Passivo" | "Receita" | "Despesa" | "Capital";
  natureza: "Devedora" | "Credora";
  nivel: number;
}

const contas: Conta[] = [
  { codigo: "1", nome: "ACTIVO", tipo: "Activo", natureza: "Devedora", nivel: 0 },
  { codigo: "1.1", nome: "Disponibilidades", tipo: "Activo", natureza: "Devedora", nivel: 1 },
  { codigo: "1.1.01", nome: "Caixa Geral", tipo: "Activo", natureza: "Devedora", nivel: 2 },
  { codigo: "1.1.02", nome: "Banco BAI — Conta Operacional", tipo: "Activo", natureza: "Devedora", nivel: 2 },
  { codigo: "1.1.03", nome: "Banco BFA — Conta Reserva", tipo: "Activo", natureza: "Devedora", nivel: 2 },
  { codigo: "2", nome: "PASSIVO", tipo: "Passivo", natureza: "Credora", nivel: 0 },
  { codigo: "2.1", nome: "Fornecedores", tipo: "Passivo", natureza: "Credora", nivel: 1 },
  { codigo: "2.2", nome: "Impostos a Pagar", tipo: "Passivo", natureza: "Credora", nivel: 1 },
  { codigo: "3", nome: "RECEITAS", tipo: "Receita", natureza: "Credora", nivel: 0 },
  { codigo: "3.1", nome: "Publicidade Comercial", tipo: "Receita", natureza: "Credora", nivel: 1 },
  { codigo: "3.2", nome: "Patrocínios", tipo: "Receita", natureza: "Credora", nivel: 1 },
  { codigo: "4", nome: "DESPESAS", tipo: "Despesa", natureza: "Devedora", nivel: 0 },
  { codigo: "4.1", nome: "Pessoal", tipo: "Despesa", natureza: "Devedora", nivel: 1 },
  { codigo: "4.2", nome: "Operacionais", tipo: "Despesa", natureza: "Devedora", nivel: 1 },
];

const tipoColor: Record<Conta["tipo"], string> = {
  Activo: "text-primary",
  Passivo: "text-warning-foreground",
  Receita: "text-success",
  Despesa: "text-destructive",
  Capital: "text-accent-foreground",
};

const PlanoContas = () => {
  const columns: ColumnDef<Conta>[] = [
    {
      key: "codigo",
      header: "Código",
      className: "font-mono w-32",
      render: (r) => <span className="text-muted-foreground">{r.codigo}</span>,
    },
    {
      key: "nome",
      header: "Designação",
      render: (r) => (
        <div className="flex items-center gap-2" style={{ paddingLeft: r.nivel * 16 }}>
          {r.nivel > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
          <span className={r.nivel === 0 ? "font-semibold" : ""}>{r.nome}</span>
        </div>
      ),
    },
    {
      key: "tipo",
      header: "Tipo",
      render: (r) => <span className={`font-medium ${tipoColor[r.tipo]}`}>{r.tipo}</span>,
    },
    {
      key: "natureza",
      header: "Natureza",
      render: (r) => <span className="text-muted-foreground">{r.natureza}</span>,
    },
  ];

  return (
    <PageShell
      title="Plano de Contas"
      subtitle="Estrutura contabilística da rádio · PGC Angola"
      actions={
        <>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Exportar
          </Button>
          <Button size="sm" className="gap-2 bg-gradient-header shadow-brand hover:opacity-95">
            <Plus className="h-4 w-4" /> Nova Conta
          </Button>
        </>
      }
    >
      <DataTable
        title="Contas Contabilísticas"
        description={`${contas.length} contas registadas`}
        searchPlaceholder="Procurar conta..."
        footer="Plano de Contas conforme PGC Angola"
      >
        <Table columns={columns} data={contas} rowKey={(r) => r.codigo} />
      </DataTable>
    </PageShell>
  );
};

export default PlanoContas;
