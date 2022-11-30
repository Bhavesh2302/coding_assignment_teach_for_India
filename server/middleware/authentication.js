
const jwt = require("jsonwebtoken")
require("dotenv").config()
const authentication =(req, res, next)=>{
    if(!req.headers.authorization){
        res.status(401).send({"msg":"please login again"})
    }
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        if(err){
            res.status(401).send({"msg":"something went wrong please try again"})
        }
        else{
            req.body.userId =  decoded.userId
            next()
        }
      });
}

module.exports ={
    authentication,
}