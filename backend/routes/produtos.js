const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const mysql = require('../config/mysql').pool;
require('dotenv').config();
const multer = require('multer');



//tratamento de upload de imagem
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname);
  }
})

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter

})


// Inserindo um registro
router.post('/', upload.single('imagem_produto'), (req, res, next) => {
  console.log("passando aqui", req.file);
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      ' INSERT  INTO produtos (nome, preco, imagem_produto) VALUES (?,?,?)',
      [
        req.body.nome,
        req.body.preco,
        req.file.path,
      ],
      (error, result, field) => {
        conn.release();

        if (error) { return res.status(500).send({ error: error }) }
        const response = {
          mensage: 'produto inserido com sucesso',

          produtoCriado: {
            id_produto: result.id_produto,
            nome: req.body.nome,
            preco: req.body.preco,
            imagem_produto: req.file.path,


            request: {
              tipo: 'POST',
              descricao: 'Inserindo um registro',
              url: process.env.URL_POST_PRODUTOS
            }
          }
        }
        return res.status(201).send(response);
      }
    );
  });
});


//Retornando todos os registros
router.get('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query
      ('SELECT * FROM ecommerce.produtos;',
        (error, result, fields) => {
          conn.release();
          if (error) { return res.status(500).send({ error: error }) }
          const response = {
            quantidade: result.length,
            produtos: result.map(prod => {
              return {
                id_produto: prod.id_produto,
                nome: prod.nome,
                preco: prod.preco,
                imagem_produto: prod.imagem_produto,
                Request: {
                  tipo: 'GET',
                  descricao: 'Retorna os detalhes de apenas um registro',
                  url: process.env.URL_GET_PRODUTOS + prod.id_produto
                }
              }
            })
          }
          return res.status(200).send(response)
        });
  });
});


//retorna apenas um registro
router.get('/:id_produto', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      'SELECT * FROM ecommerce.produtos WHERE id_produto = ?;',
      [req.params.id_produto],
      (error, result, field) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
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
              tipo: 'POST',
              descricao: 'retorna todos os registros',
              url: process.env.URL_GET_PRODUTOS
            }
          }
        }
        return res.status(200).send(response);
      }
    )
  })
})


//Editando registros
router.patch('/', upload.single('imagem_produto'), (req, res, next) => {
  console.log("passando", req.file)
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      `UPDATE produtos SET nome = ?,preco = ?,imagem_produto = ? WHERE id_produto = ?`,
      [
        req.body.nome,
        req.body.preco,
        req.file.path,
        req.body.id_produto
      ],

      (error, result, field) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
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
    );
  });
});


// Excluindo registros
router.delete('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
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
});










// //Editando registros
// router.patch('/', (req, res, next) => {
//   mysql.getConnection((error, conn) => {
//     if (error) { return res.status(500).send({ error: error }) }
//     conn.query(
//       `UPDATE produtos SET imagem_produto = ? WHERE id_produto = ?`,
//       [
//         req.body.id_produto,
//         req.file.path,
//       ],

//       (error, result, field) => {
//         conn.release();
//         if (error) { return res.status(500).send({ error: error }) }
//         const response = {
//           mensage: 'produto Atualizado com sucesso',
//           produtoAtualizado: {
//             id_produto: req.body.id_produto,
//            imagem_produto:req.file.path,

//             request: {
//               tipo: 'GET',
//               descricao: 'Retorna os detalhes de um produto específico',
//               url: process.env.URL_GET_PRODUTOS + req.body.id_produto
//             }
//           }
//         }
//         return res.status(202).send(response);
//       }
//     );
//   });
// });












module.exports = router;
