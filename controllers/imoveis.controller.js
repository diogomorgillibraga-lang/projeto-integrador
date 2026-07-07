import db from "../config/database.js";

// LISTAR IMÓVEIS
// LISTAR IMÓVEIS (CORRIGIDO PARA POSTGRESQL / NEON)
export const listarImoveis = async (req, res) => {
  try {
    // No Postgres, pegamos o objeto de resultado completo
    const resultado = await db.query("SELECT * FROM imoveis ORDER BY id DESC");
    
    // Retornamos especificamente a propriedade .rows, que contém a lista de imóveis
    res.json(resultado.rows || resultado);
  } catch (error) {
    console.error("Erro ao listar imóveis:", error);
    res.status(500).json({ erro: error.message });
  }
};
// LISTAR USUÁRIOS (CORRIGIDO PARA POSTGRESQL)
export const listarUsuarios = async (req, res) => {
  try {
    const resultado = await db.query("SELECT * FROM usuarios ORDER BY nome ASC");
    // Retorna .rows para o padrão do Postgres
    res.json(resultado.rows || resultado);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({ erro: error.message });
  }
};

// CRIAR IMÓVEL
export const criarImovel = async (req, res) => {
  try {
    console.log("BODY RECEBIDO NO BACKEND:", req.body);

    // Ajustamos a Query para conter as colunas do seu banco Neon e marcadores do Postgres ($1, $2, etc.)
    const sql = `
      INSERT INTO imoveis 
      (usuario_id, referencia, tipo_negocio, tipo_imovel, titulo, descricao, preco, endereco, bairro, cidade, estado, quartos, banheiros, vagas, area_m2, ativo, destaque)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
    `;

    // Mapeamos os valores na ordem exata dos marcadores acima
    await db.query(sql, [
      req.body.usuario_id || 9,
      req.body.referencia,
      req.body.tipo_negocio,
      req.body.tipo_imovel,
      req.body.titulo,
      req.body.descricao || '',
      req.body.preco,
      req.body.endereco,
      req.body.bairro || 'Centro',
      req.body.cidade || 'Itajobi',
      req.body.estado || 'SP',
      req.body.quartos || 0,
      req.body.banheiros || 0,
      req.body.vagas || 0,
      req.body.area_m2 || 0,
      true, // ativo (boolean)
      false // destaque (boolean)
    ]);

    res.status(201).json({ mensagem: "Imóvel criado com sucesso" });

  } catch (error) {
    console.error("Erro interno no backend ao criar imóvel:", error);
    res.status(500).json({ erro: error.message });
  }
};

// DELETAR IMÓVEL (CORRIGIDO PARA POSTGRESQL)
export const deletarImovel = async (req, res) => {
  try {
    const { id } = req.params; 

    // Mudamos o '?' para '$1' devido ao PostgreSQL
    const sql = "DELETE FROM imoveis WHERE id = $1";
    
    // Dependendo do driver do Postgres, o retorno pode mudar de [result] para result direto.
    // Usamos uma verificação segura para funcionar perfeitamente:
    const resultado = await db.query(sql, [id]);
    const rowsAffected = resultado.affectedRows || resultado.rowCount || 0;

    res.status(200).json({ mensagem: "Imóvel deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar imóvel:", error);
    res.status(500).json({ erro: error.message });
  }
};