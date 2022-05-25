const jwt = require ('jsonwebtoken');

module.exports = {
    validateRegister: (req, res, next) => {
        if (!req.body.username || req.body.username.length < 3) {
            return res.status(400).send({
                message: "Lütfen en az 3 karakter giriniz.",
            });
        }
        if (!req.body.password || req.body.password.length < 6) {
            return res.status(400).send({
                message: "Hatalı şifre",
            });
        }
        if (!req.body.password_repeat || req.body.password != req.body.password_repeat) {
            return res.status(400).send({
                message: "Şifreler eşleşmemektedir.",
            });
        }
        next();
    },
    isLoggedIn:(req,res,next)=>{
        if(!req.headers.authorization){
            return res.status(400).send({
                message:"Your session is not valid!",
            });
        }
        try{
            const authHeader = req.headers.authorization;
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,'SECRETKEY');
            req.userData = decoded;
            next();
        } catch(err){
            return res.status(400).send({
                message:"Your session is not valid",
            })
        }
    },
};