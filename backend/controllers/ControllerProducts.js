const mysql = require('../config/mysql');



exports.postProducts = async (req, res) => {
  try {
    const queryverification = 'SELECT * FROM ecommerce.products WHERE name = ?;';
    const result = await mysql.execute(queryverification, [
      req.body.name
    ]);

    if (result.length == 1) {
      return res.status(404).send({
        message: 'You already have a file with that name!'
      })
    }
    const query = ' INSERT  INTO ecommerce.products (name, price, productImage) VALUES (?,?,?);';
    await mysql.execute(query, [
      req.body.name,
      req.body.price,
      req.file.path
    ]);

    const response = {
      mensage: 'product inserted successfully!',
      createdProduct: {
        productId: result.productId,
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path,
        request: {
          type: 'POST',
          description: 'inserting a record',
          url: process.env.URL_POST_PROCUTS
        }
      }
    }
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}



exports.getProducts = async (req, res) => {
  try {
    const result = await mysql.execute("SELECT * FROM ecommerce.products;")
    const response = {
      quantity: result.length,
      product: result.map(prod => {
        return {
          productId: prod.productId,
          name: prod.name,
          price: prod.price,
          productImage: prod.productImage,
          request: {
            type: "GET",
            description: 'Returns all details of a record',
            URL: process.env.URL_GET_PRODUCTS + prod.productId
          }
        }
      })
    }
    return res.status(200).send(response)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}



exports.getProductUnique = async (req, res) => {
  try {
    const query = 'SELECT * FROM ecommerce.products WHERE productId = ?;';
    const result = await mysql.execute(query, [req.params.productId]);

    if (result.length == 0) {
      return res.status(404).send({
        message: 'No record was found with the given ID'
      })
    }
    const response = {
      product: {
        productId: result[0].productId,
        name: result[0].name,
        price: result[0].price,
        productImage: result[0].productImage,
        request: {
          type: 'GET',
          description: 'Returns all records',
          url: process.env.URL_GET_PRODUCTS
        }
      }
    }
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};



exports.patchProduct = async (req, res) => {
  try {
    const verification = 'SELECT * FROM products WHERE productId = ?;';
    const result = await mysql.execute(verification, [req.body.productId]);
    if (result.length == 0) {
      return res.status(404).send({
        message: 'No record was found with the given ID'
      })
    }
    const query = 'UPDATE products SET name = ?,price = ?,productImage = ? WHERE productId = ?;';
    await mysql.execute(query, [
      req.body.name,
      req.body.price,
      req.file.path,
      req.body.productId
    ]);
    const response = {
      mensage: 'Product updated successfully',
      productUpdated: {
        productId: req.body.productId,
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path,
        request: {
          type: 'GET',
          description: 'Returns all details of a record',
          url: process.env.URL_GET_PRODUCTS + req.body.productId
        }
      }
    }
    return res.status(202).send(response);
  }
  catch (error) {
    return res.status(500).send({ error: error });
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const verification = 'SELECT * FROM products WHERE productId = ?;';
    const result = await mysql.execute(verification, [req.body.productId])

    if (result.length == 0) {
      return res.status(404).send({
        message: 'No record was found with the given ID'
      })
    }

    const query = 'DELETE FROM ecommerce.products WHERE productId = ?';
    await mysql.execute(query, [
      req.body.productId
    ]);

    const response = {
      message: 'Record removed successfully',
      request: {
        type: 'POST',
        descrocao: 'Insert a record',
        url: process.env.URL_POST_PRODUCTS,
        body: {
          nome: 'String',
          preco: 'Number'
        }
      }
    }
    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}









exports.postImagem = async (req, res) => {
  try {
    const queryverification = 'SELECT * FROM ecommerce.imagens_produtos WHERE caminho  = ?;';
    const result = await mysql.execute(queryverification, [
      req.file.path,
    ]);

    if (result.length == 1) {
      return res.status(404).send({
        message: 'Já existe um produto com essa Imagem!'
      })
    }
    const query = ' INSERT INTO ecommerce.imagens_produtos (id_produto, caminho) VALUES (?,?);';
    const results = await mysql.execute(query, [
      req.params.id_produto,
      req.file.path
    ]);

    const response = {
      mensage: 'Imagem Inserida com sucesso',
      imagemCriada: {
        id_produto: parseInt(req.params.id_produto),
        id_imagem: results.insertId,
        imagem_produto: req.file.path,
        request: {
          type: 'GET',
          description: 'Retorna todas as imagens',
          url: process.env.URL_GET_IMAGENS + 'produtos/' + req.params.id_produto + '/imagens'
        }
      }
    }
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}






exports.getImagems = async (req, res) => {
  try {
    const query = 'SELECT * FROM ecommerce.imagens_produtos WHERE id_produto = ?;';
    const result = await mysql.execute(query, [req.params.id_produto]);
    const response = {
      quantidade: result.length,
      imagens: result.map(img => {
        return {
          id_produto: parseInt(req.params.id_produto),
          id_imagem: img.id_imagem,
          caminho: process.env.URL_GET_IMAGENS + img.caminho
        }
      })
    }
    return res.status(200).send(response)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}
