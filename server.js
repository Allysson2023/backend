const express = require('express');
const app = express();

app.use(express.json());

const produtos = [
    { id: 1, nome: "Arroz", preco: 5.50},
    { id: 2, nome: "Feijão", preco: 7.00},
    { id: 3, nome: "Macarrão", preco: 4.00}
]

// GET 
app.get('/produtos', (req, res) =>{
    res.json(produtos)
});

// POST
app.post('/produtos', (req, res) => {
    const novoProduto = req.body

    produtos.push(novoProduto)
    res.json(novoProduto)
});

// DELETE
app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = produtos.findIndex(p=> p.id === id);


    if (index === -1){
        return res.status(404).json({erro: 'Produto não encontrado!'})
    }

    produtos.splice(index, 1)


    return  res.status(200).json({
        mensagem: 'Produto deletado com sucesso!'})
})

// PUT
app.put('/produtos/:id', (req, res) => {
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
})

app.get('/', (req, res) => {
    res.send('Api funcionando...')
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
    
});