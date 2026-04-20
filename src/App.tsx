import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { EmpresasProvider } from "@/hooks/useEmpresas";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index.tsx";
import Auth from "./pages/Auth.tsx";
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
        <AuthProvider>
          <EmpresasProvider>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/plano-contas" element={<ProtectedRoute><PlanoContas /></ProtectedRoute>} />
              <Route path="/lancamentos" element={<ProtectedRoute><Lancamentos /></ProtectedRoute>} />
              <Route path="/pagar" element={<ProtectedRoute><ContasPagar /></ProtectedRoute>} />
              <Route path="/receber" element={<ProtectedRoute><ContasReceber /></ProtectedRoute>} />
              <Route path="/conta-corrente" element={<ProtectedRoute><ContaCorrente /></ProtectedRoute>} />
              <Route path="/dre" element={<ProtectedRoute><Dre /></ProtectedRoute>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </EmpresasProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
