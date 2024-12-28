const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');



const doSignup = async (req, res) => {
    try {
        console.log('req.body recieved', req.body);
        if (!req.body?.password) {
            res.json({
                data: [],
                status: "error",
                error: "password is required"
            })
        }
        var hash = bcrypt.hashSync(req.body.password, 8);
        console.log('hash', hash);
        let newUser = new User({
            name: req.body?.name,
            email: req.body?.email,
            password: hash,
            address: req.body?.address
        })

        let output = await newUser.save();
        res.json({
            data:output,
            status: "success"
        })

    } catch (error) {
        res.json({
            data: [],
            status: "error",
            error: error
        })
    }
};

const doLogin = async (req, res) => {
    try {
        const userFound = await User.findOne({email: req.body.email})
        var passwordIsValid = bcrypt.compareSync(req.body.password, userFound.password)
        const secretKey = process.env.SECRET_KEY
        var token = jwt.sign({id: userFound._id, email: userFound.email, name: userFound.name}, secretKey);
        res.json({
            data: {
              token: token,
               email: userFound.email,
                name: userFound.name,

            },
            status: 'success'
        })
    }
    catch(err){
        res.json({
            data: [],
            status: 'error',
            error: err
        })
    }
}
module.exports = {  doSignup
    , doLogin
 }