const jwt = require('jsonwebtoken');

const SECRET = "segredo123";

module.exports = (req, res, next) => {

    console.log("HEADER COMPLETO:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({erro: "Sem token"});
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        console.log("TOKEN VÁLIDO:", decoded);
        next();
    } catch (err) {
        console.log("ERRO JWT REAL:", err.message);
        return res.status(401).json({erro: err.message });
    }
};