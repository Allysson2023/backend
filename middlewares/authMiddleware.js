const jwt = require('jsonwebtoken');

const SECRET = "segredo123";

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({erro: "Sem token"});
    }

    const token = authHeader.split(" ")[1];

    try {
        jwt.verify(token, SECRET);
        next();
    } catch {
        return res.status(401).json({erro: "Token inválido" });
    }
};