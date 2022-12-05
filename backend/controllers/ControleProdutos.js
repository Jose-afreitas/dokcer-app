const mysql = require('../config/mysql');


// exports.postProdutos = (req, res, next) => {
//   // console.log('token usuario', req.usuario)
//   //validação
//   mysql.getConnection((error, conn) => {
//     if (error) { return res.status(500).send({ error: error }) }
//     console.log('teste', req.file)

//     conn.query(
//       'SELECT * FROM ecommerce.produtos WHERE nome = ?',
//       [req.body.nome],
//       (error, result, field) => {
//         if (error) { return res.status(500).send({ error: error }) }
//         if (result.length == 1) {
//           return res.status(404).send({
//             message: 'Já existe um produto com esse nome!'
//           })
//         }
//         // registro depois da verificação
//         conn.query(
//           ' INSERT  INTO ecommerce.produtos (nome, preco, imagem_produto) VALUES (?,?,?)',
//           [
//             req.body.nome,
//             req.body.preco,
//             req.file.path,
//           ],
//           (error, result, field) => {
//             conn.release();
//             if (error) { return res.status(500).send({ error: error }) }
//             const response = {
//               mensage: 'produto inserido com sucesso',
//               produtoCriado: {
//                 id_produto: result.id_produto,
//                 nome: req.body.nome,
//                 preco: req.body.preco,
//                 imagem_produto: req.file.path,
//                 request: {
//                   tipo: 'POST',
//                   descricao: 'Inserindo um registro',
//                   url: process.env.URL_POST_PRODUTOS
//                 }
//               }
//             }
//             return res.status(201).send(response);
//           }
//         );
//       });
//   }
//   )
// }




exports.getProdutos = async (req, res, next) => {
  try {
    const result = await mysql.execute("SELECT * FROM ecommerce.produtos;")
    const response = {
      quantidade: result.length,
      produtos: result.map(prod => {
        return {
          id_produto: prod.id_produto,
          nome: prod.nome,
          preco: prod.preco,
          imagem_produto: prod.imagem_produto,
          request: {
            tipo: "GET",
            descricao: 'Retorna todos os detalhes de um registro',
            URL: process.env.URL_GET_PRODUTOS + prod.id_produto
          }
        }
      })
    }
    return res.status(200).send(response)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}




exports.getProdutoUnico = async (req, res, next) => {
  try {
    const query = 'SELECT * FROM ecommerce.produtos WHERE id_produto = ?;';
    const result = await mysql.execute(query, [req.params.id_produto]);

    if (result.length == 0) {
      return res.status(404).send({
        message: 'Não foi encontrado registro com o ID informado'
      })
    }
    const response = {
      produto: {
        id_produto: result[0].id_produto,
        nome: result[0].nome,
        preco: result[0].preco,
        imagem_produto: result[0].imagem_produto,
        request: {
          tipo: 'GET',
          descricao: 'retorna todos os registros',
          url: process.env.URL_GET_PRODUTOS + 'produtos'
        }
      }
    }
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }

};










exports.patchProdutos = async (req, res, next) => {
  try {
    const queryverification = 'SELECT * FROM produtos WHERE id_produto = ?;';
    const result = await mysql.execute(queryverification, [req.body.id_produto]);

    if (result.length == 0) {
      return res.status(404).send({
        message: 'Não possui produto registrado com esse ID'
      })
    }




    const query = 'UPDATE produtos SET nome = ?,preco = ?,imagem_produto =? WHERE id_produto = ?;';
    await mysql.execute(query, [
      req.body.nome,
      req.body.preco,
      req.file.path,
      req.body.id_produto
    ]);

    const response = {
      mensage: 'produto Atualizado com sucesso',
      produtoAtualizado: {
        id_produto: req.body.id_produto,
        nome: req.body.nome,
        preco: req.body.preco,
        imagem_produto: req.file.path,
        request: {
          tipo: 'GET',
          descricao: 'Retorna os detalhes de um produto específico',
          url: process.env.URL_GET_PRODUTOS + req.body.id_produto
        }
      }
    }
    return res.status(202).send(response);
  }
  catch (error) {
    return res.status(500).send({ error: error });
  }
}











// exports.patchProdutos = (req, res, next) => {
//   //validação
//   mysql.getConnection((error, conn) => {
//     if (error) { return res.status(500).send({ error: error }) }
//     conn.query(
//       'SELECT * FROM produtos WHERE id_produto = ?;',
//       [req.body.id_produto],
//       (error, result, field) => {
//         if (error) { return res.status(500).send({ error: error }) }
//         if (result.length == 0) {
//           return res.status(404).send({
//             message: 'Não possui produto registrado com esse ID'
//           })
//         }
//         //Atualizando um registro depois da verificação
//         conn.query(
//           `UPDATE produtos SET nome = ?,preco = ?,imagem_produto = ? WHERE id_produto = ?`,
//           [
//             req.body.nome,
//             req.body.preco,
//             req.file.path,
//             req.body.id_produto
//           ],

//           (error, result, field) => {
//             conn.release();
//             if (error) { return res.status(500).send({ error: error }) }
//             const response = {
//               mensage: 'produto Atualizado com sucesso',
//               produtoAtualizado: {
//                 id_produto: req.body.id_produto,
//                 nome: req.body.nome,
//                 preco: req.body.preco,
//                 imagem_produto: req.file.path,
//                 request: {
//                   tipo: 'GET',
//                   descricao: 'Retorna os detalhes de um produto específico',
//                   url: process.env.URL_GET_PRODUTOS + req.body.id_produto
//                 }
//               }
//             }
//             return res.status(202).send(response);
//           }
//         );
//       });
//   }
//   )
// }



// exports.deleteProduto = (req, res, next) => {
//   //validação
//   mysql.getConnection((error, conn) => {
//     if (error) { return res.status(500).send({ error: error }) }
//     conn.query(
//       'SELECT * FROM produtos WHERE id_produto = ?;',
//       [req.body.id_produto],
//       (error, result, field) => {
//         if (error) { return res.status(500).send({ error: error }) }
//         if (result.length == 0) {
//           return res.status(404).send({
//             message: 'Não possui produto registrado com esse ID'
//           })
//         }
//         //Deletando um registro depois da verificação
//         conn.query(
//           `DELETE FROM produtos WHERE id_produto = ?`,
//           [req.body.id_produto],
//           (error, result, field) => {
//             conn.release();
//             if (error) { return res.status(500).send({ error: error }) }
//             const response = {
//               message: 'Registro removido com sucesso',
//               request: {
//                 tipo: 'POST',
//                 descrocao: 'insere um registro',
//                 url: process.env.URL_POST_PRODUTOS,
//                 body: {
//                   nome: 'String',
//                   preco: 'Number'
//                 }
//               }
//             }
//             return res.status(202).send(response);
//           }
//         );
//       });
//   }
//   )
// }











