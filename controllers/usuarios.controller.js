import db from "../config/database.js";

// LISTAR USUÁRIOS DO BANCO
// LISTAR USUÁRIOS (CORRIGIDO PARA POSTGRESQL / NEON)
export const listarUsuarios = async (req, res) => {
  try {
    // No Postgres, pegamos o objeto de resultado completo (sem os colchetes [rows])
    const resultado = await db.query("SELECT * FROM usuarios ORDER BY nome ASC");
    
    // Retornamos especificamente a propriedade .rows que o PostgreSQL usa
    res.json(resultado.rows || resultado);
  } catch (error) {
    console.error("Erro interno ao listar usuários:", error);
    res.status(500).json({ erro: error.message });
  }
};
// No seu usuarios.controller.js
// DELETAR USUÁRIO (CORRIGIDO PARA POSTGRESQL / NEON)
export const deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Mudamos o '?' para '$1' (padrão obrigatório do Postgres)
    const sql = "DELETE FROM usuarios WHERE id = $1";
    
    // 2. No Postgres, capturamos o retorno direto (sem os colchetes [])
    const resultado = await db.query(sql, [id]);
    
    // 3. No Postgres, verificamos a quantidade de linhas afetadas usando rowCount
    const linhasAfetadas = resultado.rowCount || resultado.affectedRows || 0;

    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.status(200).json({ mensagem: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ erro: error.message });
  }
};
