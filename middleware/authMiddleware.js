const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

let generateToke = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { data: user },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      }
    );
  });
};
let verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
};

let isAuthen = async (req, res, next)=>{
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    if(tokenFromClient){
        try{
            const decoded = await verifyToken(tokenFromClient, accessTokenSecret);
            req.jwtDecoded = decoded;
            next();
        }catch(error){
            return res.status(401).json({
                message: 'Unauthorized',
            })
        }
    }else{
        return res.status(403).send({
            message: 'No token provided',
        })
    }
}
module.exports={
    generateToke,
    isAuthen
}