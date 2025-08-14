const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
    const jwt_secrate = process.env.JWT_SECREATE_KEY;
    const token = req.header("auth-token");

    if (!token) {
        return res.status(501).json({ "error": "Authentication token not found", "type": "all authenticate routes /middleware -> authenticate_user.js - !token" });
    }

    try {
        const data = jwt.verify(token, jwt_secrate);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(501).json({ "error": "Authentication token verification failed", "type": "all authenticate routes /middleware -> authenticate_user.js - !token" })
    }


}

module.exports = fetchuser;