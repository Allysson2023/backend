const express = require('express');
const cors = require('cors')
const multer = require("multer");
const db = require('./db');
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename:(req, file, cb)=> {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage })

const app = express();

app.post("/upload-produto", upload.single("imagem"), (req, res) => {
    const { nome, preco } = req.body;

    const imagem = req.file.filename;

    const sql = "INSERT INTO produtos (nome, preco, imagem) VALUES (?, ?, ?)";

    db.query(sql, [nome, preco, imagem], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        
        res.json({
            id: result.insertId,
            nome,
            preco,
            imagem: `http://localhost:3000/uploads/${imagem}`
        });
    });

});

app.use(cors())
app.use(express.json());

app.use("/uploads", express.static("uploads"));

const produtoRoutes = require('./routes/produtoRoutes');

app.use(produtoRoutes);

app.get('/', (req, res) => {
    res.send('Api funcionando...')
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
    
});