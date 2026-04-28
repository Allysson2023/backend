const express = require('express');
const app = express();

app.use(express.json());

const produtoRoutes = require('./routes/produtoRoutes');

app.use(produtoRoutes);

app.get('/', (req, res) => {
    res.send('Api funcionando...')
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
    
});