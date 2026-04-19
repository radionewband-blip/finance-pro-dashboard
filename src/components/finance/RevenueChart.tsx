import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { mes: "Jul", receitas: 1850000, despesas: 1320000 },
  { mes: "Ago", receitas: 2100000, despesas: 1450000 },
  { mes: "Set", receitas: 1980000, despesas: 1380000 },
  { mes: "Out", receitas: 2340000, despesas: 1520000 },
  { mes: "Nov", receitas: 2580000, despesas: 1680000 },
  { mes: "Dez", receitas: 2890000, despesas: 1820000 },
  { mes: "Jan", receitas: 3120000, despesas: 1950000 },
];

const formatKz = (n: number) => `${(n / 1_000_000).toFixed(1)}M`;

export function RevenueChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="desp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity={0.25} />
              <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatKz} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              boxShadow: "var(--shadow-lg)",
              fontSize: "12px",
            }}
            formatter={(value: number) => [`${value.toLocaleString("pt-PT")} Kz`, ""]}
          />
          <Area type="monotone" dataKey="receitas" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#rev)" name="Receitas" />
          <Area type="monotone" dataKey="despesas" stroke="hsl(var(--destructive))" strokeWidth={2.5} fill="url(#desp)" name="Despesas" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
