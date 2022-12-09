const express = require('express');
const cors = require('cors')
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routeProducts = require('./routes/products')
const routeOrders = require('./routes/orders')
const routeUsers = require('./routes/users');
const routeImage = require('./routes/images');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*')
    res.header(
        'Acces-Control-Allow-Header',
        'Origin, X-Requrested-with, Content-Type, Accept, Autorization')
    if (req.method === 'OPTIONS') {
        res.header('Acces-control_allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});
app.use('/uploads', express.static('uploads'))
app.use(morgan('dev'));

app.use('/produtos', routeProducts);
app.use('/pedidos', routeOrders);
app.use('/usuarios', routeUsers);
app.use('/imagens', routeImage);

//Quando não encontra a rota
app.use((req, res, next) => {
    const erro = new Error("Not found");
    erro.status = 404
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            message: error.message
        }
    })
});


module.exports = app;
