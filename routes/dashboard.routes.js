import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

router.get('/dashboard', async (req, res) => {
  try {

    const [[{ totalImoveis }]] = await pool.query(
      'SELECT COUNT(*) AS totalImoveis FROM imoveis'
    );

    const [[{ venda }]] = await pool.query(
      "SELECT COUNT(*) AS venda FROM imoveis WHERE tipo_negocio = 'Venda'"
    );

    const [[{ aluguel }]] = await pool.query(
      "SELECT COUNT(*) AS aluguel FROM imoveis WHERE tipo_negocio = 'Aluguel'"
    );

    const [[{ usuarios }]] = await pool.query(
      'SELECT COUNT(*) AS usuarios FROM usuarios'
    );

    res.json({
      totalImoveis,
      venda,
      aluguel,
      usuarios
    });

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message
    });
  }
});

export default router;