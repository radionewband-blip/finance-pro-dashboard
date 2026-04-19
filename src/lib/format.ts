export const fmtKz = (n: number) =>
  `${new Intl.NumberFormat("pt-PT", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)} Kz`;

export const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat("pt-PT", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(iso));
