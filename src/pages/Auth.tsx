import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { z } from "zod";
import { Briefcase, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const loginSchema = z.object({
  email: z.string().trim().email("Email inválido").max(255),
  password: z.string().min(6, "Mínimo 6 caracteres").max(72),
});

const signupSchema = loginSchema.extend({
  displayName: z.string().trim().min(2, "Nome demasiado curto").max(80),
});

const Auth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  // Forms
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  useEffect(() => {
    if (user && !loading) navigate("/", { replace: true });
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }
  if (user) return <Navigate to="/" replace />;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = loginSchema.safeParse({ email: loginEmail, password: loginPassword });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Falha no login", { description: error.message });
      return;
    }
    toast.success("Sessão iniciada");
    navigate("/", { replace: true });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signupSchema.safeParse({
      email: signupEmail,
      password: signupPassword,
      displayName: signupName,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { display_name: parsed.data.displayName },
      },
    });
    setSubmitting(false);
    if (error) {
      toast.error("Falha no registo", { description: error.message });
      return;
    }
    toast.success("Conta criada", { description: "Já podes começar a usar o sistema" });
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/30 to-background p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="h-14 w-14 rounded-xl bg-gradient-header shadow-brand flex items-center justify-center">
            <Briefcase className="h-7 w-7 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold">Finance Pro</h1>
            <p className="text-sm text-muted-foreground">Corporate Edition</p>
          </div>
        </div>

        <Card className="p-6 shadow-lg border-border/60">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Criar conta</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="nome@empresa.ao"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Palavra-passe</Label>
                  <Input
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-header shadow-brand hover:opacity-95"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Nome completo</Label>
                  <Input
                    id="signup-name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="João Silva"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="nome@empresa.ao"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Palavra-passe</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-header shadow-brand hover:opacity-95"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Criar conta"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  O primeiro utilizador a registar-se torna-se administrador.
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Finance Pro · Sistema de gestão financeira para emissoras
        </p>
      </div>
    </div>
  );
};

export default Auth;
