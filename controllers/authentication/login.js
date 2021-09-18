const User = require("../../models").User
const bcrypt = require('bcrypt');

module.exports.Login = async (req, res, next) => {

    let user = await User.findOne({
        where : {
            email: req.body.email
        }
    })

    if (!user){
        let loginError = "user do not exist"
        res.render("auth/login",{loginError})
    }else{
        let loginError = "Invalid Email or Password"
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        validPassword ? res.render("dashboard") : res.render("auth/login",{loginError})
    }
}