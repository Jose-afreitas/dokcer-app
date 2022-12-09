const mysql = require('../config/mysql');


exports.postOrders = async (req, res) => {
  try {
    const veriication = 'SELECT * FROM ecommerce.products WHERE productId = ?;';
    const result = await mysql.execute(veriication, [
      req.body.productId
    ]);

    console.log(result);
    if (result.length == 0) {
      return res.status(404).send({
        message: 'There is no product registered with this ID'
      });

    }
    console.log(result);
    const query = 'INSERT INTO ecommerce.orders(productId, quantity) VALUES (?,?);';
    await mysql.execute(query, [
      req.body.productId, req.body.quantity
    ]);
    const response = {
      message: 'Record inserted successfully!',
      productOrder: {
        orderId: result.orderId,
        productId: req.body.productId,
        quantity: req.body.quantity,
        request: {
          type: 'GET',
          description: 'Insert a record',
          url: process.env.URL_GET_ORDERS
        }
      }
    }
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}



exports.getOrders = async (req, res, next) => {
  try {
    const result = await mysql.execute(`
            SELECT ped.orderId, ped.quantity, prod.name, prod.price, prod.productId
              FROM ecommerce.products as prod 
              JOIN ecommerce.orders as ped 
                ON prod.productId = ped.productId;`
    )
    const response = {
      quantityOrders: result.length,
      order: result.map(order => {
        return {
          orderId: order.orderId,
          quantity: order.quantity,
          product: {
            productId: order.productId,
            name: order.name,
            price: order.price
          },
          request: {
            type: 'GET',
            description: 'Returns the details of a specific record',
            url: process.env.URL_GET_ORDERS + order.orderId
          }
        }
      })
    }
    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}



exports.getOrderUnique = async (req, res) => {
  try {
    const query = `
              SELECT ped.quantity , prod.name, prod.price, ped.orderId, prod.productId
                FROM ecommerce.products as prod 
                JOIN ecommerce.orders as ped 
                  ON prod.productId = ped.productId
               WHERE ped.orderId = ?`;

    const result = await mysql.execute(query, [
      req.params.orderId, req.params.productId
    ]);

    if (result.length == 0) {
      return res.status(404).send({
        message: 'The record with the given ID was not found'
      })
    }
    const response = {
      order: {
        orderId: result[0].orderId,
        quantity_order: result[0].quantity,
        product: {
          productId: result[0].productId,
          name: result[0].name,
          price: result[0].price
        },
        request: {
          type: 'POST',
          description: 'Returns all records',
          url: process.env.URL_GET_ORDERS
        }
      }
    }
    return res.status(200).send(response)
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}


exports.patchOrder = async (req, res) => {
  try {
    const verification = 'SELECT * FROM ecommerce.orders WHERE orderId = ?;';
    const result = await mysql.execute(verification, [
      req.body.orderId
    ])
    if (result.length == 0) {
      return res.status(500).send({
        message: 'No record was found with the given ID'
      })
    }
    const query = `UPDATE ecommerce.orders SET orderId = ?, quantity = ? WHERE orderId = ?`;
    await mysql.execute(query, [
      req.body.productId, req.body.quantity, req.body.orderId
    ]);
    const response = {
      message: 'Record updated successfully!',
      orderUpdated: {
        orderId: req.body.orderId,
        id_produto: req.body.id_produto,
        quantity: req.body.quantity,
        request: {
          type: 'GET',
          description: 'Returns all records',
          url: process.env.URL_GET_ORDERS
        }
      }
    }
    return res.status(202).send(response)
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};




exports.deleteOrder = async (req, res) => {
  try {
    const verification = 'SELECT * FROM ecommerce.orders WHERE orderId =?;';
    const result = await mysql.execute(verification, [req.body.orderId]);

    if (result.length == 0) {
      return res.status(404).send({
        message: 'No record was found with the given ID'
      })
    }

    const query = 'DELETE FROM ecommerce.orders WHERE orderId = ?;';
    await mysql.execute(query, [req.body.orderId]);

    const response = {
      message: 'Record deleted successfuly',
      request: {
        type: 'POST',
        description: 'Insert a record',
        url: process.env.URL_POST_ORDERS,
        body: {
          id_produto: 'number',
          quantity: 'Number'
        }
      }
    }
    return res.status(202).send(response)
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}





