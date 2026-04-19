import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tx {
  id: string;
  description: string;
  category: string;
  date: string;
  amount: number;
  type: "in" | "out";
}

const transactions: Tx[] = [
  { id: "TX-1042", description: "Publicidade — Unitel", category: "Receita Comercial", date: "18 Abr", amount: 850000, type: "in" },
  { id: "TX-1041", description: "Salários — Equipa Técnica", category: "Pessoal", date: "17 Abr", amount: 620000, type: "out" },
  { id: "TX-1040", description: "Patrocínio — Banco BAI", category: "Receita Comercial", date: "16 Abr", amount: 1200000, type: "in" },
  { id: "TX-1039", description: "ENDE — Energia Eléctrica", category: "Operacional", date: "15 Abr", amount: 145000, type: "out" },
  { id: "TX-1038", description: "Spot Publicitário — TPA", category: "Receita Comercial", date: "14 Abr", amount: 380000, type: "in" },
  { id: "TX-1037", description: "Manutenção Estúdio", category: "Operacional", date: "13 Abr", amount: 92000, type: "out" },
];

const fmt = (n: number) => `${n.toLocaleString("pt-PT")} Kz`;

export function RecentTransactions() {
  return (
    <div className="divide-y divide-border">
      {transactions.map((tx) => (
        <div key={tx.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0 group">
          <div
            className={cn(
              "h-9 w-9 shrink-0 rounded-md flex items-center justify-center",
              tx.type === "in" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            )}
          >
            {tx.type === "in" ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground truncate">{tx.description}</div>
            <div className="text-xs text-muted-foreground">
              {tx.category} · {tx.date} · <span className="font-mono">{tx.id}</span>
            </div>
          </div>

          <div
            className={cn(
              "text-sm font-semibold tabular-nums shrink-0",
              tx.type === "in" ? "text-success" : "text-foreground"
            )}
          >
            {tx.type === "in" ? "+" : "−"} {fmt(tx.amount)}
          </div>
        </div>
      ))}
    </div>
  );
}
