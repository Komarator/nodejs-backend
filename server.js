
const express = require("express");
const router = express.Router();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userMiddleware =require("./app/middleware/users");
const db = require("./app/models/db");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Emre's application." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/animal.routes")(app);
require("./app/routes/ownership.routes")(app);

app.post("/giris",(req,res,next)=>{
        db.query(`SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
            (err,result)=>{
                if(err){
                    throw err;
                    return res.status(400).send({
                        message:err,
                    });
                }
                if(!result.length){
                    return res.status(400).send({
                        message:"Kullanıcı adı veya şifre hatalı.",
                    });
                }
                bcrypt.compare(req.body.password,result[0]['password'],(bErr,bResult)=>{
                        if(bErr){
                            throw bErr;
                            return res.status(400).send({
                                message:"Kullanıcı adı veya şifre hatalı.",
                            });
                        }
                        if(bResult){
                            const token =jwt.sign({
                                    username : result[0].username,
                                    userId: result[0].id,
                                },
                                "SECRETKEY",
                                {expiresIn: "7d"}
                            );
                            db.query(`UPDATE users SET last_login = now() WHERE id =${result[0].id};`);
                            return res.status(200).send({
                                message: 'Logged in!',
                                token,
                                user: result[0]
                            });
                        }
                        return res.status(400).send({
                            message:"Kullanıcı adı veya şifre hatalı.",
                        });
                    }
                );
            }
        );
    }
);

app.post("/kayit-ol",userMiddleware.validateRegister,(req,res,next)=>{
    db.query('SELECT id FROM users WHERE LOWER(username)=LOWER(${req.body.username})',(err,result)=>{
        if(result && result.length){
            return res.status(409).send({
                message:"Kullanıcı hatası."
            })
        } else{bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){return res.status(500).send({message:err,});
            } else {db.query(`INSERT INTO users(username,password,name,surname,phone,email,birth_date,adress,country,city,district) VALUES(${db.escape(req.body.username)},'${hash}',${db.escape(req.body.name)},${db.escape(req.body.surname)},${db.escape(req.body.phone)},${db.escape(req.body.email)},${db.escape(req.body.birth_date)},${db.escape(req.body.adress)},${db.escape(req.body.country)},${db.escape(req.body.city)},${db.escape(req.body.district)});`,
                (err,result)=>{
                    if(err){
                        throw err;
                        return res.status(400).send({
                            message:err,
                        });
                    }
                    return res.status(201).send({
                        message:"Registered!",
                    });
                }
                )}
        })}
    })
});



app.get("/secret-route",userMiddleware.isLoggedIn,(req,res,next)=>{
    console.log(req.userData);
    res.send("This is secret content!");
})




// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});