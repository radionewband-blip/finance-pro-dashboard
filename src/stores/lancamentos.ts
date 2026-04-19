import { create } from "zustand";

export interface Lancamento {
  id: string;
  data: string; // ISO yyyy-mm-dd
  conta: string;
  descricao: string;
  documento: string;
  tipo: "Crédito" | "Débito";
  valor: number;
}

const seed: Lancamento[] = [
  { id: "TX-1042", data: "2026-04-18", conta: "3.1 Publicidade", descricao: "Publicidade — Unitel", documento: "FT 2026/0412", tipo: "Crédito", valor: 850000 },
  { id: "TX-1041", data: "2026-04-17", conta: "4.1 Pessoal", descricao: "Salários — Equipa Técnica", documento: "REC 2026/0089", tipo: "Débito", valor: 620000 },
  { id: "TX-1040", data: "2026-04-16", conta: "3.2 Patrocínios", descricao: "Patrocínio — Banco BAI", documento: "FT 2026/0411", tipo: "Crédito", valor: 1200000 },
  { id: "TX-1039", data: "2026-04-15", conta: "4.2 Operacionais", descricao: "ENDE — Energia Eléctrica", documento: "FT 2026/0410", tipo: "Débito", valor: 145000 },
  { id: "TX-1038", data: "2026-04-14", conta: "3.1 Publicidade", descricao: "Spot Publicitário — TPA", documento: "FT 2026/0409", tipo: "Crédito", valor: 380000 },
  { id: "TX-1037", data: "2026-04-13", conta: "4.2 Operacionais", descricao: "Manutenção Estúdio", documento: "FT 2026/0408", tipo: "Débito", valor: 92000 },
  { id: "TX-1036", data: "2026-04-12", conta: "3.1 Publicidade", descricao: "Campanha — Movicel", documento: "FT 2026/0407", tipo: "Crédito", valor: 540000 },
  { id: "TX-1035", data: "2026-04-11", conta: "4.1 Pessoal", descricao: "Subsídios de Alimentação", documento: "REC 2026/0088", tipo: "Débito", valor: 180000 },
];

export const CATEGORIAS = [
  { codigo: "3.1 Publicidade", tipo: "Crédito" as const },
  { codigo: "3.2 Patrocínios", tipo: "Crédito" as const },
  { codigo: "3.3 Outras Receitas", tipo: "Crédito" as const },
  { codigo: "4.1 Pessoal", tipo: "Débito" as const },
  { codigo: "4.2 Operacionais", tipo: "Débito" as const },
  { codigo: "4.3 Manutenção", tipo: "Débito" as const },
  { codigo: "4.4 Combustíveis", tipo: "Débito" as const },
];

interface LancamentosState {
  items: Lancamento[];
  add: (l: Omit<Lancamento, "id">) => Lancamento;
}

export const useLancamentos = create<LancamentosState>((set, get) => ({
  items: seed,
  add: (l) => {
    const next = get().items;
    const maxNum = next.reduce((m, x) => {
      const n = parseInt(x.id.replace(/\D/g, ""), 10);
      return Number.isFinite(n) && n > m ? n : m;
    }, 1042);
    const novo: Lancamento = { ...l, id: `TX-${maxNum + 1}` };
    set({ items: [novo, ...next] });
    return novo;
  },
}));
