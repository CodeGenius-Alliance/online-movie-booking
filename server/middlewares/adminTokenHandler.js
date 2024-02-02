const jwt=require('jsonwebtoken');

const validateTokenHanlder=()=>{
    try{
        let token;
        let authHeader=req.headers.authorization
        if(authHeader && authHeader.startsWith('Bearer')){
            token=authHeader.split(" ")[1]
            jwt.verify(token,process.env.ACCESS_TOKEN_ADMIN,(err,decode)=>{
                if(err){
                    res.status(400).send("Admin is not authorized");
                }
                req.user=decode.user;
                next();
            })
            if(!token){
                res.status(400).send("Token is expired");
            }
        }
    }
    catch(e){
        console.log(e);
    }
}

module.exports=validateTokenHanlder;