const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rotaProdutos = require('./routes/produtos')
const rotaPedidos = require('./routes/pedidos')


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

app.use(morgan('dev'));
app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

//Quando não encontra a rota
app.use((req, res, next) => {
    const erro = new Error("Não encontrado");
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
