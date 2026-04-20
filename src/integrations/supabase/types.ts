export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      agentes_comerciais: {
        Row: {
          ativo: boolean
          comissao_percent: number | null
          created_at: string
          created_by: string | null
          email: string | null
          empresa_id: string
          id: string
          nome: string
          telefone: string | null
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          comissao_percent?: number | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          empresa_id: string
          id?: string
          nome: string
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          comissao_percent?: number | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          empresa_id?: string
          id?: string
          nome?: string
          telefone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agentes_comerciais_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      bancos: {
        Row: {
          agencia: string | null
          ativo: boolean
          conta: string | null
          created_at: string
          empresa_id: string
          iban: string | null
          id: string
          moeda: string
          nome: string
          saldo_atual: number
          saldo_inicial: number
          updated_at: string
        }
        Insert: {
          agencia?: string | null
          ativo?: boolean
          conta?: string | null
          created_at?: string
          empresa_id: string
          iban?: string | null
          id?: string
          moeda?: string
          nome: string
          saldo_atual?: number
          saldo_inicial?: number
          updated_at?: string
        }
        Update: {
          agencia?: string | null
          ativo?: boolean
          conta?: string | null
          created_at?: string
          empresa_id?: string
          iban?: string | null
          id?: string
          moeda?: string
          nome?: string
          saldo_atual?: number
          saldo_inicial?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bancos_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      centros_custo: {
        Row: {
          ativo: boolean
          codigo: string
          created_at: string
          descricao: string
          empresa_id: string
          id: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          codigo: string
          created_at?: string
          descricao: string
          empresa_id: string
          id?: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          codigo?: string
          created_at?: string
          descricao?: string
          empresa_id?: string
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "centros_custo_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      centros_receita: {
        Row: {
          ativo: boolean
          codigo: string
          created_at: string
          descricao: string
          empresa_id: string
          id: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          codigo: string
          created_at?: string
          descricao: string
          empresa_id: string
          id?: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          codigo?: string
          created_at?: string
          descricao?: string
          empresa_id?: string
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "centros_receita_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          ativo: boolean
          created_at: string
          created_by: string | null
          email: string | null
          empresa_id: string
          endereco: string | null
          id: string
          nif: string | null
          nome: string
          segmento: string | null
          telefone: string | null
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          created_by?: string | null
          email?: string | null
          empresa_id: string
          endereco?: string | null
          id?: string
          nif?: string | null
          nome: string
          segmento?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          created_by?: string | null
          email?: string | null
          empresa_id?: string
          endereco?: string | null
          id?: string
          nif?: string | null
          nome?: string
          segmento?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clientes_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      contas_pagar: {
        Row: {
          banco_id: string | null
          created_at: string
          created_by: string | null
          data_emissao: string
          data_pagamento: string | null
          data_vencimento: string
          descricao: string
          documento: string | null
          empresa_id: string
          fornecedor_id: string | null
          id: string
          observacoes: string | null
          status: Database["public"]["Enums"]["conta_status"]
          updated_at: string
          valor: number
          valor_pago: number
        }
        Insert: {
          banco_id?: string | null
          created_at?: string
          created_by?: string | null
          data_emissao?: string
          data_pagamento?: string | null
          data_vencimento: string
          descricao: string
          documento?: string | null
          empresa_id: string
          fornecedor_id?: string | null
          id?: string
          observacoes?: string | null
          status?: Database["public"]["Enums"]["conta_status"]
          updated_at?: string
          valor: number
          valor_pago?: number
        }
        Update: {
          banco_id?: string | null
          created_at?: string
          created_by?: string | null
          data_emissao?: string
          data_pagamento?: string | null
          data_vencimento?: string
          descricao?: string
          documento?: string | null
          empresa_id?: string
          fornecedor_id?: string | null
          id?: string
          observacoes?: string | null
          status?: Database["public"]["Enums"]["conta_status"]
          updated_at?: string
          valor?: number
          valor_pago?: number
        }
        Relationships: [
          {
            foreignKeyName: "contas_pagar_banco_id_fkey"
            columns: ["banco_id"]
            isOneToOne: false
            referencedRelation: "bancos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_pagar_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_pagar_fornecedor_id_fkey"
            columns: ["fornecedor_id"]
            isOneToOne: false
            referencedRelation: "fornecedores"
            referencedColumns: ["id"]
          },
        ]
      }
      contas_receber: {
        Row: {
          banco_id: string | null
          cliente_id: string | null
          created_at: string
          created_by: string | null
          data_emissao: string
          data_recebimento: string | null
          data_vencimento: string
          descricao: string
          documento: string | null
          empresa_id: string
          id: string
          observacoes: string | null
          status: Database["public"]["Enums"]["conta_status"]
          updated_at: string
          valor: number
          valor_recebido: number
        }
        Insert: {
          banco_id?: string | null
          cliente_id?: string | null
          created_at?: string
          created_by?: string | null
          data_emissao?: string
          data_recebimento?: string | null
          data_vencimento: string
          descricao: string
          documento?: string | null
          empresa_id: string
          id?: string
          observacoes?: string | null
          status?: Database["public"]["Enums"]["conta_status"]
          updated_at?: string
          valor: number
          valor_recebido?: number
        }
        Update: {
          banco_id?: string | null
          cliente_id?: string | null
          created_at?: string
          created_by?: string | null
          data_emissao?: string
          data_recebimento?: string | null
          data_vencimento?: string
          descricao?: string
          documento?: string | null
          empresa_id?: string
          id?: string
          observacoes?: string | null
          status?: Database["public"]["Enums"]["conta_status"]
          updated_at?: string
          valor?: number
          valor_recebido?: number
        }
        Relationships: [
          {
            foreignKeyName: "contas_receber_banco_id_fkey"
            columns: ["banco_id"]
            isOneToOne: false
            referencedRelation: "bancos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_receber_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_receber_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas: {
        Row: {
          ativa: boolean
          created_at: string
          email: string | null
          endereco: string | null
          id: string
          logo_url: string | null
          moeda: string
          nif: string | null
          nome: string
          telefone: string | null
          updated_at: string
        }
        Insert: {
          ativa?: boolean
          created_at?: string
          email?: string | null
          endereco?: string | null
          id?: string
          logo_url?: string | null
          moeda?: string
          nif?: string | null
          nome: string
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          ativa?: boolean
          created_at?: string
          email?: string | null
          endereco?: string | null
          id?: string
          logo_url?: string | null
          moeda?: string
          nif?: string | null
          nome?: string
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      fornecedores: {
        Row: {
          ativo: boolean
          categoria: string | null
          created_at: string
          created_by: string | null
          email: string | null
          empresa_id: string
          endereco: string | null
          id: string
          nif: string | null
          nome: string
          telefone: string | null
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          categoria?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          empresa_id: string
          endereco?: string | null
          id?: string
          nif?: string | null
          nome: string
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          categoria?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          empresa_id?: string
          endereco?: string | null
          id?: string
          nif?: string | null
          nome?: string
          telefone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fornecedores_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      lancamentos: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          banco_id: string | null
          centro_custo_id: string | null
          centro_receita_id: string | null
          cliente_id: string | null
          conta_id: string | null
          created_at: string
          created_by: string | null
          data: string
          descricao: string
          documento: string | null
          empresa_id: string
          fornecedor_id: string | null
          id: string
          numero: string
          rejected_reason: string | null
          status: Database["public"]["Enums"]["lancamento_status"]
          tipo: Database["public"]["Enums"]["lancamento_tipo"]
          updated_at: string
          valor: number
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          banco_id?: string | null
          centro_custo_id?: string | null
          centro_receita_id?: string | null
          cliente_id?: string | null
          conta_id?: string | null
          created_at?: string
          created_by?: string | null
          data: string
          descricao: string
          documento?: string | null
          empresa_id: string
          fornecedor_id?: string | null
          id?: string
          numero: string
          rejected_reason?: string | null
          status?: Database["public"]["Enums"]["lancamento_status"]
          tipo: Database["public"]["Enums"]["lancamento_tipo"]
          updated_at?: string
          valor: number
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          banco_id?: string | null
          centro_custo_id?: string | null
          centro_receita_id?: string | null
          cliente_id?: string | null
          conta_id?: string | null
          created_at?: string
          created_by?: string | null
          data?: string
          descricao?: string
          documento?: string | null
          empresa_id?: string
          fornecedor_id?: string | null
          id?: string
          numero?: string
          rejected_reason?: string | null
          status?: Database["public"]["Enums"]["lancamento_status"]
          tipo?: Database["public"]["Enums"]["lancamento_tipo"]
          updated_at?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "lancamentos_banco_id_fkey"
            columns: ["banco_id"]
            isOneToOne: false
            referencedRelation: "bancos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_centro_custo_id_fkey"
            columns: ["centro_custo_id"]
            isOneToOne: false
            referencedRelation: "centros_custo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_centro_receita_id_fkey"
            columns: ["centro_receita_id"]
            isOneToOne: false
            referencedRelation: "centros_receita"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "plano_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_fornecedor_id_fkey"
            columns: ["fornecedor_id"]
            isOneToOne: false
            referencedRelation: "fornecedores"
            referencedColumns: ["id"]
          },
        ]
      }
      movimentos_bancarios: {
        Row: {
          banco_id: string
          conciliado: boolean
          created_at: string
          created_by: string | null
          data: string
          descricao: string
          documento: string | null
          empresa_id: string
          id: string
          lancamento_id: string | null
          saldo_apos: number | null
          tipo: Database["public"]["Enums"]["movimento_tipo"]
          updated_at: string
          valor: number
        }
        Insert: {
          banco_id: string
          conciliado?: boolean
          created_at?: string
          created_by?: string | null
          data: string
          descricao: string
          documento?: string | null
          empresa_id: string
          id?: string
          lancamento_id?: string | null
          saldo_apos?: number | null
          tipo: Database["public"]["Enums"]["movimento_tipo"]
          updated_at?: string
          valor: number
        }
        Update: {
          banco_id?: string
          conciliado?: boolean
          created_at?: string
          created_by?: string | null
          data?: string
          descricao?: string
          documento?: string | null
          empresa_id?: string
          id?: string
          lancamento_id?: string | null
          saldo_apos?: number | null
          tipo?: Database["public"]["Enums"]["movimento_tipo"]
          updated_at?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "movimentos_bancarios_banco_id_fkey"
            columns: ["banco_id"]
            isOneToOne: false
            referencedRelation: "bancos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentos_bancarios_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentos_bancarios_lancamento_id_fkey"
            columns: ["lancamento_id"]
            isOneToOne: false
            referencedRelation: "lancamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      plano_contas: {
        Row: {
          aceita_lancamento: boolean
          ativo: boolean
          codigo: string
          conta_pai_id: string | null
          created_at: string
          descricao: string
          empresa_id: string
          id: string
          nivel: number
          tipo: Database["public"]["Enums"]["conta_tipo"]
          updated_at: string
        }
        Insert: {
          aceita_lancamento?: boolean
          ativo?: boolean
          codigo: string
          conta_pai_id?: string | null
          created_at?: string
          descricao: string
          empresa_id: string
          id?: string
          nivel?: number
          tipo: Database["public"]["Enums"]["conta_tipo"]
          updated_at?: string
        }
        Update: {
          aceita_lancamento?: boolean
          ativo?: boolean
          codigo?: string
          conta_pai_id?: string | null
          created_at?: string
          descricao?: string
          empresa_id?: string
          id?: string
          nivel?: number
          tipo?: Database["public"]["Enums"]["conta_tipo"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "plano_contas_conta_pai_id_fkey"
            columns: ["conta_pai_id"]
            isOneToOne: false
            referencedRelation: "plano_contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plano_contas_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          empresa_ativa_id: string | null
          id: string
          telefone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          empresa_ativa_id?: string | null
          id?: string
          telefone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          empresa_ativa_id?: string | null
          id?: string
          telefone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_empresa_ativa_id_fkey"
            columns: ["empresa_ativa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          empresa_id: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          empresa_id?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          empresa_id?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_approve: {
        Args: { _empresa_id: string; _user_id: string }
        Returns: boolean
      }
      can_edit_empresa: {
        Args: { _empresa_id: string; _user_id: string }
        Returns: boolean
      }
      has_empresa_access: {
        Args: { _empresa_id: string; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _empresa_id?: string
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "supervisor" | "operador" | "viewer"
      conta_status:
        | "pendente"
        | "parcial"
        | "liquidada"
        | "vencida"
        | "cancelada"
      conta_tipo: "ativo" | "passivo" | "patrimonio" | "receita" | "despesa"
      lancamento_status:
        | "rascunho"
        | "pendente"
        | "aprovado"
        | "liquidado"
        | "rejeitado"
      lancamento_tipo: "credito" | "debito"
      movimento_tipo: "entrada" | "saida" | "transferencia"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "supervisor", "operador", "viewer"],
      conta_status: [
        "pendente",
        "parcial",
        "liquidada",
        "vencida",
        "cancelada",
      ],
      conta_tipo: ["ativo", "passivo", "patrimonio", "receita", "despesa"],
      lancamento_status: [
        "rascunho",
        "pendente",
        "aprovado",
        "liquidado",
        "rejeitado",
      ],
      lancamento_tipo: ["credito", "debito"],
      movimento_tipo: ["entrada", "saida", "transferencia"],
    },
  },
} as const
