import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/finance/PageShell";
import { fmtKz } from "@/lib/format";
import { cn } from "@/lib/utils";

interface Linha {
  codigo?: string;
  label: string;
  valor?: number;
  tipo?: "header" | "subtotal" | "total" | "detail";
}

const linhas: Linha[] = [
  { label: "RECEITAS OPERACIONAIS", tipo: "header" },
  { codigo: "3.1", label: "Publicidade Comercial", valor: 1770000, tipo: "detail" },
  { codigo: "3.2", label: "Patrocínios", valor: 1200000, tipo: "detail" },
  { codigo: "3.3", label: "Outras Receitas", valor: 150000, tipo: "detail" },
  { label: "Total de Receitas", valor: 3120000, tipo: "subtotal" },

  { label: "DESPESAS OPERACIONAIS", tipo: "header" },
  { codigo: "4.1", label: "Pessoal e Encargos Sociais", valor: -800000, tipo: "detail" },
  { codigo: "4.2", label: "Energia, Água e Comunicações", valor: -358000, tipo: "detail" },
  { codigo: "4.3", label: "Manutenção e Conservação", valor: -307000, tipo: "detail" },
  { codigo: "4.4", label: "Combustíveis e Frota", valor: -185000, tipo: "detail" },
  { codigo: "4.5", label: "Outras Despesas Operacionais", valor: -300000, tipo: "detail" },
  { label: "Total de Despesas", valor: -1950000, tipo: "subtotal" },

  { label: "RESULTADO OPERACIONAL", valor: 1170000, tipo: "total" },

  { label: "RESULTADO FINANCEIRO", tipo: "header" },
  { codigo: "5.1", label: "Juros Bancários (Receita)", valor: 28000, tipo: "detail" },
  { codigo: "5.2", label: "Encargos Bancários (Despesa)", valor: -45000, tipo: "detail" },
  { label: "Resultado Financeiro Líquido", valor: -17000, tipo: "subtotal" },

  { label: "RESULTADO LÍQUIDO DO PERÍODO", valor: 1153000, tipo: "total" },
];

const Dre = () => {
  const periodo = new Intl.DateTimeFormat("pt-PT", { month: "long", year: "numeric" }).format(new Date());
  const periodoCap = periodo.charAt(0).toUpperCase() + periodo.slice(1);

  return (
    <PageShell
      title="Demonstração de Resultados"
      subtitle={`Período · ${periodoCap}`}
      actions={
        <>
          <Button variant="outline" size="sm" className="gap-2"><Printer className="h-4 w-4" /> Imprimir</Button>
          <Button size="sm" className="gap-2 bg-gradient-header shadow-brand hover:opacity-95"><Download className="h-4 w-4" /> Exportar PDF</Button>
        </>
      }
    >
      <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-border bg-gradient-card">
          <h2 className="font-display text-lg font-semibold">DRE · Radio New Band</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Demonstração de Resultados do Exercício · Valores em Kwanzas (Kz)</p>
        </div>

        <table className="w-full text-sm">
          <tbody>
            {linhas.map((l, i) => {
              if (l.tipo === "header") {
                return (
                  <tr key={i} className="bg-muted/40">
                    <td colSpan={3} className="px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {l.label}
                    </td>
                  </tr>
                );
              }
              if (l.tipo === "total") {
                return (
                  <tr key={i} className="bg-primary/5 border-y-2 border-primary/30">
                    <td colSpan={2} className="px-6 py-4 font-bold text-foreground uppercase tracking-wide">{l.label}</td>
                    <td className={cn("px-6 py-4 text-right font-display text-xl font-bold tabular-nums", (l.valor ?? 0) >= 0 ? "text-success" : "text-destructive")}>
                      {fmtKz(l.valor ?? 0)}
                    </td>
                  </tr>
                );
              }
              if (l.tipo === "subtotal") {
                return (
                  <tr key={i} className="border-t border-border bg-muted/20">
                    <td colSpan={2} className="px-6 py-3 font-semibold text-foreground">{l.label}</td>
                    <td className={cn("px-6 py-3 text-right font-semibold tabular-nums", (l.valor ?? 0) >= 0 ? "text-success" : "text-destructive")}>
                      {fmtKz(l.valor ?? 0)}
                    </td>
                  </tr>
                );
              }
              return (
                <tr key={i} className="border-t border-border/60 hover:bg-muted/20">
                  <td className="px-6 py-2.5 w-20 font-mono text-xs text-muted-foreground">{l.codigo}</td>
                  <td className="px-6 py-2.5 text-foreground">{l.label}</td>
                  <td className={cn("px-6 py-2.5 text-right tabular-nums", (l.valor ?? 0) < 0 ? "text-muted-foreground" : "text-foreground")}>
                    {fmtKz(l.valor ?? 0)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
};

export default Dre;
