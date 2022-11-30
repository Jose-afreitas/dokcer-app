const mysql = require('../config/mysql').pool;






































exports.deleteProduto = (req, res, next) => {
  //validação
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      'SELECT * FROM produtos WHERE id_produto = ?;',
      [req.body.id_produto],
      (error, result, field) => {
        if (error) { return res.status(500).send({ error: error }) }
        if (result.length == 0) {
          return res.status(404).send({
            message: 'Não possui produto registrado com esse ID'
          })
        }
        //Deletando um registro depois da verificação
        conn.query(
          `DELETE FROM produtos WHERE id_produto = ?`,
          [req.body.id_produto],
          (error, result, field) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }
            const response = {
              message: 'Registro removido com sucesso',
              request: {
                tipo: 'POST',
                descrocao: 'insere um registro',
                url: process.env.URL_POST_PRODUTOS,
                body: {
                  nome: 'String',
                  preco: 'Number'
                }
              }
            }
            return res.status(202).send(response);
          }
        );
      });
  }
  )
}











