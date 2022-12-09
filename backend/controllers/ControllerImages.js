const mysql = require('../config/mysql');


exports.deleteImagem = async (req, res) => {
    try {
        const query = 'DELETE FROM ecommerce.imagens_produtos WHERE id_imagem = ?;';
        await mysql.execute(query, [
            req.params.id_imagem
        ]);

        const response = {
            message: 'Imagem removida com sucesso!',
            // request: {
            //     tipo: 'POST',s
            //     descricao: 'Insere uma imagem',
            //     url: process.env.URL_POST_IMAGENS + 'imagens'
            // }
        }
        return res.status(202).send(response);
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: error })
    }
}