import pool from '../config/database.js';

// export async function dashboard(req, res) {
//  try {
//
//    const [imoveis] = await pool.query(
//      "SELECT COUNT(*) AS total FROM imoveis"
//    );
//
//    const [venda] = await pool.query(
//      "SELECT COUNT(*) AS total FROM imoveis WHERE tipo='venda'"
//    );
//
//    const [aluguel] = await pool.query(
//      "SELECT COUNT(*) AS total FROM imoveis WHERE tipo='aluguel'"
//    );
//
//    const [usuarios] = await pool.query(
//      "SELECT COUNT(*) AS total FROM usuarios"
//    );
//
//    res.json({
//      totalImoveis: imoveis[0].total,
//      venda: venda[0].total,
//      aluguel: aluguel[0].total,
//      usuarios: usuarios[0].total
//    });
//
//  } catch (erro) {
//    console.log(erro);
//
//    res.status(500).json({
//      erro: "Erro ao carregar dashboard"
//    });
//  }
//}