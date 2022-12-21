exports.setHeaders = (req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods","GET,POET,DELETE,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
    next();
}