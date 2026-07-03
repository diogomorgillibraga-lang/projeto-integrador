import db from "../config/database.js";

// LISTAR IMÓVEIS
export const listarImoveis = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM imoveis");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// CRIAR IMÓVEL
export const criarImovel = async (req, res) => {
  try {
    console.log("BODY RECEBIDO:", req.body);

    const sql = `
      INSERT INTO imoveis 
      (usuario_id, referencia, tipo_negocio, tipo_imovel, titulo, descricao, preco, endereco, quartos, banheiros, vagas, area_m2, ativo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(sql, [
      req.body.usuario_id,
      req.body.referencia,
      req.body.tipo_negocio,
      req.body.tipo_imovel,
      req.body.titulo,
      req.body.descricao,
      req.body.preco,
      req.body.endereco,
      req.body.quartos || 0,
      req.body.banheiros || 0,
      req.body.vagas || 0,
      req.body.area_m2 || 0,
      1
    ]);

    res.status(201).json({ mensagem: "Imóvel criado com sucesso" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
};
export const deletarImovel = async (req, res) => {
    try {
      const { id } = req.params; // Captura o ID vindo da URL
  
      const sql = "DELETE FROM imoveis WHERE id = ?";
      const [result] = await db.query(sql, [id]);
  
      // Verifica se algum registro foi realmente afetado/deletado
      if (result.affectedRows === 0) {
        return res.status(404).json({ erro: "Imóvel não encontrado" });
      }
  
      res.status(200).json({ mensagem: "Imóvel deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: error.message });
    }
  };