const express = require('express');
const app = express();

app.use(express.json());

const produtos = [
    { id: 1, nome: "Arroz", preco: 5.50},
    { id: 2, nome: "Feijão", preco: 7.00},
    { id: 3, nome: "Macarrão", preco: 4.00}
]

app.get('/produtos', (req, res) =>{
    res.json(produtos)
});

app.post('/produtos', (req, res) => {
    const novoProduto = req.body

    produtos.push(novoProduto)
    res.json(novoProduto)
});

app.get('/', (req, res) => {
    res.send('Api funcionando...')
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
    
});