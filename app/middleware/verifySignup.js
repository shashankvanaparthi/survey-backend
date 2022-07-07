const db = require('./../models');
const ROLES = db.ROLES;
const superAdmin = db.superAdmin;

checkDuplicateEmail = (req,res,next) => {
    superAdmin.findOne({
        email:req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).send({
                msg:"Failed Email already in use try logging in..!"
            })
        }
        next();
    })
}

checkRolesExisted = (req,res,next) => {
    if(req.body.roles) {
        for(let i=0;i<req.body.length;i++) {
            if(!ROLES.includes(req.body.roles[i])) {
                return res.status(400).send({
                    msg:`Request failed role does not exist ${req.body.roles[i]}`
                })
            }
        }
    }
    next();
}

checkPassword = (req,res,next) => {
    if(req.body.password!=req.body.confirmPassword) {
        return res.status(400).send({
            msg:'Password and confirm password must be same'
        });
    }
    next();
}

const verifySignUp = {
    checkDuplicateEmail : checkDuplicateEmail,
    checkRolesExisted   : checkRolesExisted,
    checkPassword : checkPassword
}

module.exports = verifySignUp; 