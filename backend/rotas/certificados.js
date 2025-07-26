/** @format */

const express = require("express");
const router = express.Router();
const db = require("../configuracoes/baseDados");
const autenticar = require("../middleware/autenticar");
const autorizarPapel = require("../middleware/autorizarPapel");
const PDFDocument = require("pdfkit");
const { format } = require("date-fns");

// ✅ Marcar curso como concluído
router.patch(
  "/concluir/:cursoId",
  autenticar,
  autorizarPapel("aluno"),
  async (req, res) => {
    const { cursoId } = req.params;
    const usuarioId = req.usuario.id;

    try {
      const resultado = await db.query(
        `UPDATE inscricoes 
         SET concluido = true
         WHERE curso_id = $1 AND usuario_id = $2
         RETURNING *`,
        [cursoId, usuarioId]
      );

      if (resultado.rowCount === 0)
        return res.status(404).json({ erro: "Inscrição não encontrada" });

      res.status(200).json({
        sucesso: true,
        mensagem: "Curso marcado como concluído!",
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao concluir curso" });
    }
  }
);

// ✅ Gerar certificado PDF
router.get(
  "/:cursoId",
  autenticar,
  autorizarPapel("aluno"),
  async (req, res) => {
    const { cursoId } = req.params;
    const usuarioId = req.usuario.id;

    try {
      // Verifica se o aluno concluiu o curso
      const inscricao = await db.query(
        `SELECT u.nome, c.titulo
         FROM inscricoes i
         JOIN usuarios u ON i.usuario_id = u.id
         JOIN cursos c ON i.curso_id = c.id
         WHERE i.usuario_id = $1 AND i.curso_id = $2 AND i.concluido = true`,
        [usuarioId, cursoId]
      );

      if (inscricao.rowCount === 0)
        return res.status(403).json({ erro: "Curso ainda não foi concluído" });

      const { nome, titulo } = inscricao.rows[0];

      // Gerar PDF
      const doc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=certificado-${cursoId}.pdf`
      );

      doc.fontSize(24).text("Certificado de Conclusão", { align: "center" });
      doc.moveDown();
      doc.fontSize(16).text(`Certificamos que ${nome}`, { align: "center" });
      doc.text(`concluiu com êxito o curso: "${titulo}"`, { align: "center" });
      doc.moveDown();
      doc.fontSize(12).text(`Data: ${format(new Date(), "dd/MM/yyyy")}`, {
        align: "center",
      });

      doc.end();
      doc.pipe(res);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao gerar certificado" });
    }
  }
);

module.exports = router;
