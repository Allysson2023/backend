const express = require('express');
const cors = require('cors')
const multer = require("multer");
const db = require('./db');
const path = require("path");

const app = express();

app.use(cors())
app.use(express.json());

app.use("/uploads", express.static("uploads"));

const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);

const produtoRoutes = require('./routes/produtoRoutes');

app.use(produtoRoutes);

const authMiddleware = require('./middlewares/authMiddleware');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename:(req, file, cb)=> {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage })


app.post("/upload-produto", 
    authMiddleware,
    upload.single("imagem"),  (req, res) => {

    console.log("CHEGOU");
    console.log("Body:", req.body);
    console.log("File:", req.file);
    

    const nome = req.body?.nome;
    const preco = req.body?.preco;

    if (!nome || !preco) {
        return res.status(400).json({ erro: "Dados enviada!" });

    }

    if (!req.file){
        return res.status(400).json({ erro: "Imagem não enviada!" });
    }

    const imagem = req.file.filename;

    const sql = "INSERT INTO produtos (nome, preco, imagem) VALUES (?, ?, ?)";

    db.query(sql, [nome, preco, imagem], (err, result) => {
        if (err) {
            console.log("ERRO SQL:", err);
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

app.put("/produtos/:id/imagem", authMiddleware, upload.single("imagem"), (req, res) => {

    const id = req.params.id;

    const novaImagem = req.file.filename;

    const sql = "UPDATE produtos SET imagem = ? WHERE id = ?";

    db.query(sql, [novaImagem, id], (err, result) => {
        if(err) {
            return res.status(500).json(err);
        }

        res.json({
            mensagem: "Imagem atualizada!",
            imagem: `http://localhost:3000/uploads/${novaImagem}`
        });
    });
});




app.get('/', (req, res) => {
    res.send('Api funcionando...')
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
    
});