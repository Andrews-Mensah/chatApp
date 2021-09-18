const User = require('../../models').User
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.SignUp = async (req, res, next) => {
    let userInfo = {}
    if (req.body !== null){
        let userExist = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (userExist){
            let errorMessage = "User already Exist"
            res.render('auth/register', {errorMessage})
        }else{
            if (req.body.password !== req.body.cpassword){
                let errorMessage = "Passwords do not match"
                res.render('auth/register', {errorMessage})
            }else{
                userInfo = req.body
                 userInfo.password = await bcrypt.hash(req.body.password, saltRounds).catch((error) => {
                    console.log(error)
                });

                await User.create(userInfo).then((user) => {
                    res.render("auth/login")
                }).catch((error) => {
                    console.log(error)
                    errorMessage ="Something occured"
                    res.render('auth/register', {errorMessage})   
                })
               
            }
        }
    }else{
        let errorMessage = " Empty Details "
        res.render('auth/register', {errorMessage})
    }
}