const produtos = require('../models/produto');


// GET 
exports.listar = (req, res) =>{
    res.json(produtos)
};

// POST
exports.criar = (req, res) => {
    const novoProduto = req.body
    produtos.push(novoProduto)
    res.json(novoProduto)
};

// DELETE
exports.delete = (req, res) => {
    const id = parseInt(req.params.id);

    const index = produtos.findIndex(p=> p.id === id);


    if (index === -1){
        return res.status(404).json({erro: 'Produto não encontrado!'})
    }

    produtos.splice(index, 1)


    return  res.status(200).json({
        mensagem: 'Produto deletado com sucesso!'})
};

// PUT
exports.atualizar = (req, res) => {
    const id = parseInt(req.params.id);

    const produto = produtos.find( p => p.id === id)

    if (!produto){
        return res.status(404).json({
            erro: 'Produto não encontrado!'
        })
    }

    const { nome, preco } = req.body;

    if (nome !== undefined) produto.nome = nome;
    if (preco !== undefined) produto.preco = preco;

    return res.status(200).json(produto)
}