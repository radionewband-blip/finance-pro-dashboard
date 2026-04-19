import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import PlanoContas from "./pages/PlanoContas.tsx";
import Lancamentos from "./pages/Lancamentos.tsx";
import ContasPagar from "./pages/ContasPagar.tsx";
import ContasReceber from "./pages/ContasReceber.tsx";
import ContaCorrente from "./pages/ContaCorrente.tsx";
import Dre from "./pages/Dre.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/plano-contas" element={<PlanoContas />} />
          <Route path="/lancamentos" element={<Lancamentos />} />
          <Route path="/pagar" element={<ContasPagar />} />
          <Route path="/receber" element={<ContasReceber />} />
          <Route path="/conta-corrente" element={<ContaCorrente />} />
          <Route path="/dre" element={<Dre />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
