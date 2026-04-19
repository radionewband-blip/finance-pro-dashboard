import { ReactNode } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DataTableProps {
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  toolbar?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export function DataTable({ title, description, searchPlaceholder, toolbar, children, footer }: DataTableProps) {
  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      {(title || searchPlaceholder || toolbar) && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-5 py-4 border-b border-border">
          <div>
            {title && <h2 className="font-semibold text-base text-foreground">{title}</h2>}
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
          <div className="flex items-center gap-2">
            {searchPlaceholder && (
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder={searchPlaceholder} className="pl-9 h-9 w-full md:w-64 bg-muted/40" />
              </div>
            )}
            {toolbar}
          </div>
        </div>
      )}
      <div className="overflow-x-auto">{children}</div>
      {footer && <div className="px-5 py-3 border-t border-border bg-muted/30 text-xs text-muted-foreground">{footer}</div>}
    </div>
  );
}

interface ColumnDef<T> {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  className?: string;
  render: (row: T) => ReactNode;
}

interface TableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  rowKey: (row: T) => string;
}

export function Table<T>({ columns, data, rowKey }: TableProps<T>) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border bg-muted/40">
          {columns.map((c) => (
            <th
              key={c.key}
              className={cn(
                "px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : "text-left",
                c.className
              )}
            >
              {c.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {data.map((row) => (
          <tr key={rowKey(row)} className="hover:bg-muted/30 transition-colors">
            {columns.map((c) => (
              <td
                key={c.key}
                className={cn(
                  "px-5 py-3 text-foreground",
                  c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : "text-left",
                  c.className
                )}
              >
                {c.render(row)}
              </td>
            ))}
          </tr>
        ))}
        {data.length === 0 && (
          <tr>
            <td colSpan={columns.length} className="px-5 py-12 text-center text-sm text-muted-foreground">
              Sem registos para apresentar.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export type { ColumnDef };
