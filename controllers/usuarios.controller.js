import db from "../config/database.js";

// LISTAR USUÁRIOS DO BANCO
export const listarUsuarios = async (req, res) => {
  try {
    // Removemos 'tipo' e 'data_cadastro' por enquanto para testar os campos padrão
    const [rows] = await db.query("SELECT id, nome, email FROM usuarios");
    
    res.json(rows);
  } catch (error) {
    console.error("Erro na query de usuários:", error);
    res.status(500).json({ erro: error.message });
  }
};
// No seu usuarios.controller.js
export const deletarUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const sql = "DELETE FROM usuarios WHERE id = ?";
      const [result] = await db.query(sql, [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }
  
      res.status(200).json({ mensagem: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: error.message });
    }
  };
