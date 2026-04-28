const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1122',
    database: 'mercadinho',
    port: 3306
})

conexao.connect((erro) => {
    if(erro) {
        console.log('Erro ao conectar:', erro);
        return
    }
    console.log('Conectado ao Mysql..');
    
})
module.exports = conexao;