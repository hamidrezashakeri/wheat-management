const jwt = require("jsonwebtoken");

exports.authenticated = (req, res, next)=>{
    const authHeader = req.get("Authorization");
    const secretKey = "hV37j4WfWxqz9r2"
    if(!authHeader){
        return res.sendStatus(401);
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, secretKey);
    if(!decodedToken){
        return res.sendStatus(403);
    }
    req.userId = decodedToken.user.userId;
    next();
}

