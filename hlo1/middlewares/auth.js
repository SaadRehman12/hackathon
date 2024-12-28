var jwt = require('jsonwebtoken');

const auth= (req, res, next) => {
    try{
        const secretKey = process.env.SECRET_KEY

        if(!req.headers.authorization){
            return res.json({
                data: [],
                status: "error",
                error: "Login required"
            })
        }
        var decoded = jwt.verify(req.headers.authorization, secretKey);

        if(!decoded){
            return res.json({
                data: [],
                status: "error",
                error: "Login required"
            })
        }
        req.body.authUser = decoded
        next()
    }
    catch(err){
        req.json({
            data: [],
            status: "error",
            error: err
        })
    }
}
module.exports = auth