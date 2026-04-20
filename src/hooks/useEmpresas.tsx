import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Empresa {
  id: string;
  nome: string;
  nif: string | null;
  moeda: string;
}

interface EmpresasContextValue {
  empresas: Empresa[];
  empresaAtiva: Empresa | null;
  setEmpresaAtiva: (e: Empresa) => Promise<void>;
  refresh: () => Promise<void>;
  loading: boolean;
}

const EmpresasContext = createContext<EmpresasContextValue | undefined>(undefined);

export function EmpresasProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [empresaAtiva, setEmpresaAtivaState] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setEmpresas([]);
      setEmpresaAtivaState(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data: emps } = await supabase
      .from("empresas")
      .select("id, nome, nif, moeda")
      .eq("ativa", true)
      .order("nome");

    const list = (emps ?? []) as Empresa[];
    setEmpresas(list);

    const { data: profile } = await supabase
      .from("profiles")
      .select("empresa_ativa_id")
      .eq("user_id", user.id)
      .maybeSingle();

    const activeId = profile?.empresa_ativa_id;
    const active = list.find((e) => e.id === activeId) ?? list[0] ?? null;
    setEmpresaAtivaState(active);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const setEmpresaAtiva = async (e: Empresa) => {
    setEmpresaAtivaState(e);
    if (user) {
      await supabase.from("profiles").update({ empresa_ativa_id: e.id }).eq("user_id", user.id);
    }
  };

  return (
    <EmpresasContext.Provider value={{ empresas, empresaAtiva, setEmpresaAtiva, refresh, loading }}>
      {children}
    </EmpresasContext.Provider>
  );
}

export function useEmpresas() {
  const ctx = useContext(EmpresasContext);
  if (!ctx) throw new Error("useEmpresas must be used within EmpresasProvider");
  return ctx;
}
