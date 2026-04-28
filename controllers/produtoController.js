const produtos = require('../models/produto');
const db = require('../db');

// GET 
exports.listar = (req, res) =>{

    const sql = `
        SELECT id, nome, preco,
        CONCAT('http://localhost:3000/uploads/', imagem) AS imagem
        FROM produtos
    `

    db.query(sql, (erro, resultado) => {
        if (erro) {
            console.log(erro);
            return res.status(500).json({ erro: 'Erro no banco'});
        }
        res.json(resultado);
    })
};

// POST
exports.criar = (req, res) => {
    const { nome, preco } = req.body;

    const sql = 'INSERT INTO produtos (nome, preco) VALUES (?, ?)';

    db.query(sql, [nome, preco], (erro, resultado) => {
        if(erro) {
            console.log(erro);
            return res.status(500).json({ erro: 'Erro ao inserir'})
        }
        res.json({ mensagem: 'Produto criado com sucesso!'});
    })
};

// DELETE
exports.deletar = (req, res) => {
    const id = parseInt(req.params.id);

    const sql = 'DELETE FROM produtos WHERE id = ?';

    db.query(sql, [id], ( erro, resultado ) => {
        if (erro) {
            console.error(erro);
            return res.status(500).json({
                erro: 'Erro ao deletar'
            })
        }
        if(resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Produto não encontrado'});
        }

        res.json({mensagem: 'Produto deletado com sucesso'});
    })
};

// PUT
exports.atualizar = (req, res) => {
    const id = parseInt(req.params.id);
    const {nome, preco} = req.body;

    const sql = 'UPDATE produtos SET nome = ?, preco = ? WHERE id =  ?';

    db.query(sql, [nome, preco, id], (erro, resultado) =>{
        if (erro) {
            console.error(erro);
            return res.status(500).json({erro: 'Erro ao atualizar'});
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({erro: 'Produto não encontrado'});
        }
        res.json({mensagem: 'Produto atualizado com sucesso!' })
    })
    
}