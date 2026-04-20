-- ============ ENUMS ============
CREATE TYPE public.app_role AS ENUM ('admin', 'supervisor', 'operador', 'viewer');
CREATE TYPE public.lancamento_status AS ENUM ('rascunho', 'pendente', 'aprovado', 'liquidado', 'rejeitado');
CREATE TYPE public.lancamento_tipo AS ENUM ('credito', 'debito');
CREATE TYPE public.conta_status AS ENUM ('pendente', 'parcial', 'liquidada', 'vencida', 'cancelada');
CREATE TYPE public.conta_tipo AS ENUM ('ativo', 'passivo', 'patrimonio', 'receita', 'despesa');
CREATE TYPE public.movimento_tipo AS ENUM ('entrada', 'saida', 'transferencia');

-- ============ TIMESTAMP HELPER ============
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- ============ EMPRESAS ============
CREATE TABLE public.empresas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  nif TEXT,
  moeda TEXT NOT NULL DEFAULT 'AOA',
  logo_url TEXT,
  endereco TEXT,
  telefone TEXT,
  email TEXT,
  ativa BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.empresas ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_empresas_updated BEFORE UPDATE ON public.empresas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  telefone TEXT,
  empresa_ativa_id UUID REFERENCES public.empresas(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ USER ROLES ============
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  empresa_id UUID REFERENCES public.empresas(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, empresa_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- ============ SECURITY DEFINER FUNCTIONS ============
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role, _empresa_id UUID DEFAULT NULL)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
      AND (_empresa_id IS NULL OR empresa_id = _empresa_id OR empresa_id IS NULL)
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = 'admin')
$$;

CREATE OR REPLACE FUNCTION public.has_empresa_access(_user_id UUID, _empresa_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND (empresa_id = _empresa_id OR empresa_id IS NULL OR role = 'admin')
  )
$$;

CREATE OR REPLACE FUNCTION public.can_edit_empresa(_user_id UUID, _empresa_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin','supervisor','operador')
      AND (empresa_id = _empresa_id OR empresa_id IS NULL OR role = 'admin')
  )
$$;

CREATE OR REPLACE FUNCTION public.can_approve(_user_id UUID, _empresa_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin','supervisor')
      AND (empresa_id = _empresa_id OR empresa_id IS NULL OR role = 'admin')
  )
$$;

-- ============ AUTO-CREATE PROFILE + FIRST USER = ADMIN ============
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  user_count INT;
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));

  SELECT COUNT(*) INTO user_count FROM auth.users;
  IF user_count = 1 THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ EMPRESAS POLICIES ============
CREATE POLICY "View empresas user has access to" ON public.empresas FOR SELECT TO authenticated
  USING (public.has_empresa_access(auth.uid(), id));
CREATE POLICY "Admins create empresas" ON public.empresas FOR INSERT TO authenticated
  WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins/supervisors update empresas" ON public.empresas FOR UPDATE TO authenticated
  USING (public.is_admin(auth.uid()) OR public.has_role(auth.uid(),'supervisor',id));
CREATE POLICY "Admins delete empresas" ON public.empresas FOR DELETE TO authenticated
  USING (public.is_admin(auth.uid()));

-- ============ PROFILES POLICIES ============
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- ============ USER ROLES POLICIES ============
CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- ============ GENERIC FACTORY: cadastros por empresa ============
-- Helper macro replaced by explicit CREATE TABLE per cadastro

CREATE TABLE public.clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  nif TEXT,
  email TEXT,
  telefone TEXT,
  endereco TEXT,
  segmento TEXT,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_clientes_updated BEFORE UPDATE ON public.clientes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_clientes_empresa ON public.clientes(empresa_id);

CREATE TABLE public.fornecedores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  nif TEXT,
  email TEXT,
  telefone TEXT,
  endereco TEXT,
  categoria TEXT,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.fornecedores ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_fornecedores_updated BEFORE UPDATE ON public.fornecedores FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_fornecedores_empresa ON public.fornecedores(empresa_id);

CREATE TABLE public.agentes_comerciais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT,
  telefone TEXT,
  comissao_percent NUMERIC(5,2) DEFAULT 0,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.agentes_comerciais ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_agentes_updated BEFORE UPDATE ON public.agentes_comerciais FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_agentes_empresa ON public.agentes_comerciais(empresa_id);

CREATE TABLE public.centros_custo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  codigo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (empresa_id, codigo)
);
ALTER TABLE public.centros_custo ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_cc_updated BEFORE UPDATE ON public.centros_custo FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.centros_receita (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  codigo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (empresa_id, codigo)
);
ALTER TABLE public.centros_receita ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_cr_updated BEFORE UPDATE ON public.centros_receita FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.bancos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  agencia TEXT,
  conta TEXT,
  iban TEXT,
  saldo_inicial NUMERIC(18,2) NOT NULL DEFAULT 0,
  saldo_atual NUMERIC(18,2) NOT NULL DEFAULT 0,
  moeda TEXT NOT NULL DEFAULT 'AOA',
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.bancos ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_bancos_updated BEFORE UPDATE ON public.bancos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_bancos_empresa ON public.bancos(empresa_id);

-- ============ PLANO DE CONTAS ============
CREATE TABLE public.plano_contas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  codigo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  tipo conta_tipo NOT NULL,
  conta_pai_id UUID REFERENCES public.plano_contas(id) ON DELETE SET NULL,
  nivel INT NOT NULL DEFAULT 1,
  aceita_lancamento BOOLEAN NOT NULL DEFAULT true,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (empresa_id, codigo)
);
ALTER TABLE public.plano_contas ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_pc_updated BEFORE UPDATE ON public.plano_contas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_pc_empresa ON public.plano_contas(empresa_id);

-- ============ LANÇAMENTOS (com workflow) ============
CREATE TABLE public.lancamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  numero TEXT NOT NULL,
  data DATE NOT NULL,
  descricao TEXT NOT NULL,
  documento TEXT,
  conta_id UUID REFERENCES public.plano_contas(id) ON DELETE RESTRICT,
  centro_custo_id UUID REFERENCES public.centros_custo(id) ON DELETE SET NULL,
  centro_receita_id UUID REFERENCES public.centros_receita(id) ON DELETE SET NULL,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE SET NULL,
  fornecedor_id UUID REFERENCES public.fornecedores(id) ON DELETE SET NULL,
  banco_id UUID REFERENCES public.bancos(id) ON DELETE SET NULL,
  tipo lancamento_tipo NOT NULL,
  valor NUMERIC(18,2) NOT NULL CHECK (valor > 0),
  status lancamento_status NOT NULL DEFAULT 'rascunho',
  created_by UUID REFERENCES auth.users(id),
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  rejected_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (empresa_id, numero)
);
ALTER TABLE public.lancamentos ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_lanc_updated BEFORE UPDATE ON public.lancamentos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_lanc_empresa_data ON public.lancamentos(empresa_id, data DESC);
CREATE INDEX idx_lanc_status ON public.lancamentos(status);

-- ============ CONTAS A PAGAR / RECEBER ============
CREATE TABLE public.contas_pagar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  fornecedor_id UUID REFERENCES public.fornecedores(id) ON DELETE SET NULL,
  documento TEXT,
  descricao TEXT NOT NULL,
  valor NUMERIC(18,2) NOT NULL CHECK (valor > 0),
  valor_pago NUMERIC(18,2) NOT NULL DEFAULT 0,
  data_emissao DATE NOT NULL DEFAULT CURRENT_DATE,
  data_vencimento DATE NOT NULL,
  data_pagamento DATE,
  status conta_status NOT NULL DEFAULT 'pendente',
  banco_id UUID REFERENCES public.bancos(id) ON DELETE SET NULL,
  observacoes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contas_pagar ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_cp_updated BEFORE UPDATE ON public.contas_pagar FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_cp_empresa_venc ON public.contas_pagar(empresa_id, data_vencimento);

CREATE TABLE public.contas_receber (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE SET NULL,
  documento TEXT,
  descricao TEXT NOT NULL,
  valor NUMERIC(18,2) NOT NULL CHECK (valor > 0),
  valor_recebido NUMERIC(18,2) NOT NULL DEFAULT 0,
  data_emissao DATE NOT NULL DEFAULT CURRENT_DATE,
  data_vencimento DATE NOT NULL,
  data_recebimento DATE,
  status conta_status NOT NULL DEFAULT 'pendente',
  banco_id UUID REFERENCES public.bancos(id) ON DELETE SET NULL,
  observacoes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contas_receber ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_cr_acc_updated BEFORE UPDATE ON public.contas_receber FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_cr_empresa_venc ON public.contas_receber(empresa_id, data_vencimento);

-- ============ MOVIMENTOS BANCÁRIOS ============
CREATE TABLE public.movimentos_bancarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  banco_id UUID NOT NULL REFERENCES public.bancos(id) ON DELETE CASCADE,
  data DATE NOT NULL,
  descricao TEXT NOT NULL,
  documento TEXT,
  tipo movimento_tipo NOT NULL,
  valor NUMERIC(18,2) NOT NULL CHECK (valor > 0),
  saldo_apos NUMERIC(18,2),
  conciliado BOOLEAN NOT NULL DEFAULT false,
  lancamento_id UUID REFERENCES public.lancamentos(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.movimentos_bancarios ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_mb_updated BEFORE UPDATE ON public.movimentos_bancarios FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_mb_banco_data ON public.movimentos_bancarios(banco_id, data DESC);

-- ============ POLICIES PADRÃO PARA TODOS OS CADASTROS POR EMPRESA ============
-- Aplicar mesmo padrão a todas as tabelas com empresa_id

DO $$
DECLARE
  t TEXT;
  tabelas TEXT[] := ARRAY[
    'clientes','fornecedores','agentes_comerciais',
    'centros_custo','centros_receita','bancos',
    'plano_contas','contas_pagar','contas_receber','movimentos_bancarios'
  ];
BEGIN
  FOREACH t IN ARRAY tabelas LOOP
    EXECUTE format('CREATE POLICY "View %1$s in accessible empresa" ON public.%1$I FOR SELECT TO authenticated USING (public.has_empresa_access(auth.uid(), empresa_id))', t);
    EXECUTE format('CREATE POLICY "Insert %1$s with edit access" ON public.%1$I FOR INSERT TO authenticated WITH CHECK (public.can_edit_empresa(auth.uid(), empresa_id))', t);
    EXECUTE format('CREATE POLICY "Update %1$s with edit access" ON public.%1$I FOR UPDATE TO authenticated USING (public.can_edit_empresa(auth.uid(), empresa_id))', t);
    EXECUTE format('CREATE POLICY "Delete %1$s admin/supervisor" ON public.%1$I FOR DELETE TO authenticated USING (public.is_admin(auth.uid()) OR public.has_role(auth.uid(),''supervisor'',empresa_id))', t);
  END LOOP;
END $$;

-- ============ LANÇAMENTOS POLICIES (workflow específico) ============
CREATE POLICY "View lancamentos in accessible empresa" ON public.lancamentos FOR SELECT TO authenticated
  USING (public.has_empresa_access(auth.uid(), empresa_id));

CREATE POLICY "Insert lancamentos with edit access" ON public.lancamentos FOR INSERT TO authenticated
  WITH CHECK (public.can_edit_empresa(auth.uid(), empresa_id) AND created_by = auth.uid());

-- Operadores só editam os próprios em rascunho/pendente; supervisores/admins editam tudo
CREATE POLICY "Update own draft lancamentos" ON public.lancamentos FOR UPDATE TO authenticated
  USING (
    public.can_approve(auth.uid(), empresa_id)
    OR (created_by = auth.uid() AND status IN ('rascunho','pendente','rejeitado'))
  );

CREATE POLICY "Delete lancamentos admin/supervisor" ON public.lancamentos FOR DELETE TO authenticated
  USING (public.can_approve(auth.uid(), empresa_id));