const { request, respose } = require('express');
const express = require('express');
const router = express.Router();
const mysql = require('../config/mysql').pool;


//Inserindo um registro

router.post('/', (req, res, next) => {
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
        //inserindo um registro depois da verificação
        conn.query(
          'INSERT INTO ecommerce.pedidos(id_produto, quantidade) VALUES (?,?)',
          [req.body.id_produto, req.body.quantidade],
          (error, result, field) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }
            const response = {
              message: 'Registro inserido com sucesso',
              pedidoCriado: {
                id_pedido: result.id_pedido,
                id_produto: req.body.id_produto,
                quantidade: req.body.quantidade,
                request: {
                  tipo: 'POST',
                  descricao: 'Inserido um registro',
                  url: process.env.URL_POST_PEDIDOS
                }
              }
            }
            return res.status(200).send(response)
          }
        )
      }
    )
  });
});





// //retorna todos os registros
router.get('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      // 'SELECT * FROM  ecommerce.pedidos;'
      `SELECT ped.id_pedido, ped.quantidade, prod.nome, prod.preco
         FROM ecommerce.produtos as prod 
         JOIN ecommerce.pedidos as ped 
           ON prod.id_produto = ped.id_produto;`,

      (error, result, fields) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
        const response = {
          // quantidade: result.length,
          pedido: result.map(pedido => {
            return {
              id_pedido: pedido.id_pedido,
              quantidade: pedido.quantidade,
              produto: {
                id_produto: pedido.id_produto,
                nome: pedido.nome,
                preco: pedido.preco
              },
              request: {
                tipo: 'GET',
                descricao: 'Retorna os detalhes de um registro específico',
                url: process.env.URL_GET_PEDIDOS + pedido.id_pedido
              }
            }
          })
        }
        return res.status(200).send(response);
      }
    )
  });
});




// Retorna apenas um registro
router.get('/:id_pedido', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      // 'SELECT * FROM ecommerce.pedidos WHERE id_pedido = ?;',

      `SELECT ped.quantidade , prod.nome, prod.preco, ped.id_pedido, prod.id_produto
          FROM ecommerce.produtos as prod 
          JOIN ecommerce.pedidos as ped 
            ON prod.id_produto = ped.id_produto
         WHERE ped.id_pedido =?;`,

      [req.params.id_pedido, req.params.id_produto],
      (error, result, field) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
        if (result.length == 0) {
          return res.status(404).send({
            message: 'Não foi encontrado o registro com o ID informado'
          })
        }
        const response = {
          pedido: {
            id_pedido: result[0].id_pedido,
            quantidade_pedido: result[0].quantidade,
            produto: {
              id_produto: result[0].id_produto,
              nome: result[0].nome,
              preco: result[0].preco
            },
            request: {
              tipo: 'POST',
              descricao: 'Retorna todos os registros',
              url: process.env.URL_GET_PEDIDOS
            }
          }
        }
        return res.status(200).send(response)
      }
    )
  })
})




//Editando registros
router.patch('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { res.status(500).send({ error: error }) }
    conn.query(

      `UPDATE pedidos SET id_produto = ? , quantidade = ? WHERE id_pedido = ?`,
      [req.body.id_produto, req.body.quantidade, req.body.id_pedido,],
      (error, result, field) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
        const response = {
          message: 'Registro Atualizado com Sucesso',
          PedidoAtualizado: {
            id_pedido: req.body.id_pedido,
            id_produto: req.body.id_produto,
            quantidade: req.body.quantidade,
            request: {
              tipo: 'GET',
              descricao: 'Retorna os detalhes de um registro específico',
              url: process.env.URL_GET_PEDIDOS + req.body.id_pedido
            }
          }
        }

        return res.status(202).send(response)
      }
    )
  })
})





//Excluindo registros
router.delete('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      `DELETE FROM pedidos WHERE id_pedido = ?;`,
      [req.body.id_pedido],
      (error, result, field) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
        const response = {
          message: 'Registro Excluido com sucesso',
          request: {
            tipo: 'POST',
            descricao: 'Insere um registro',
            url: process.env.URL_POST_PEDIDOS,
            body: {
              id_produto: 'number',
              quantidade: 'Number'
            }
          }
        }
        return res.status(202).send(response)
      }
    )
  })
})













module.exports = router;