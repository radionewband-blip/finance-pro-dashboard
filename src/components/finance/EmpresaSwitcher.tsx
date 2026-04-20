import { useState } from "react";
import { Check, ChevronsUpDown, Plus, Building2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEmpresas } from "@/hooks/useEmpresas";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const empresaSchema = z.object({
  nome: z.string().trim().min(2, "Nome demasiado curto").max(120),
  nif: z.string().trim().max(40).optional().or(z.literal("")),
});

export function EmpresaSwitcher() {
  const { empresas, empresaAtiva, setEmpresaAtiva, refresh } = useEmpresas();
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [nif, setNif] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async () => {
    const parsed = empresaSchema.safeParse({ nome, nif });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase
      .from("empresas")
      .insert({ nome: parsed.data.nome, nif: parsed.data.nif || null })
      .select("id, nome, nif, moeda")
      .single();
    setSubmitting(false);
    if (error) {
      toast.error("Não foi possível criar empresa", { description: error.message });
      return;
    }
    toast.success("Empresa criada", { description: data.nome });
    await refresh();
    if (data) await setEmpresaAtiva(data);
    setNome("");
    setNif("");
    setCreateOpen(false);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-9 gap-2 px-3 max-w-[220px] justify-between"
          >
            <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="truncate text-sm font-medium">
              {empresaAtiva?.nome ?? "Sem empresa"}
            </span>
            <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[260px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Procurar empresa..." />
            <CommandList>
              <CommandEmpty>Nenhuma empresa encontrada.</CommandEmpty>
              <CommandGroup heading="Empresas">
                {empresas.map((e) => (
                  <CommandItem
                    key={e.id}
                    value={e.nome}
                    onSelect={async () => {
                      await setEmpresaAtiva(e);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        empresaAtiva?.id === e.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="flex-1 truncate">{e.nome}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{e.moeda}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    setCreateOpen(true);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Nova empresa
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Nova empresa</DialogTitle>
            <DialogDescription>Cria uma empresa/regional para começar a gerir as suas finanças.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="emp-nome">Nome *</Label>
              <Input id="emp-nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Radio New Band" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emp-nif">NIF</Label>
              <Input id="emp-nif" value={nif} onChange={(e) => setNif(e.target.value)} placeholder="5417000000" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancelar</Button>
            <Button onClick={handleCreate} disabled={submitting} className="bg-gradient-header shadow-brand hover:opacity-95">
              {submitting ? "A criar..." : "Criar empresa"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
