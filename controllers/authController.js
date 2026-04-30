const db = require('../db');
const jwt = require('jsonwebtoken');

const SECRET = "segredo123";

exports.login = (req, res) => {
    
    console.log(req.body);
    const { email, senha } = req.body;

    const sql = "SELECT * FROM admin WHERE email = ? AND senha = ?";

    db.query(sql, [email, senha], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(401).json({ erro: "Login inválido!" });
        }

        const token = jwt.sign({ id: result[0].id}, SECRET, {
            expiresIn : "1h"
        });
        res.json({ token });
    });
};