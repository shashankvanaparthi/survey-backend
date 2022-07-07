const db = require('../models');
const crypto = require('crypto');
const User = db.User;
const Role = db.role;
const Survey = db.Survey;
const Question = db.Question;
const Option = db.Options;
const Op = db.Sequelize.Op;
const config = require("../config/config.js");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.create =  (req,res) => {
    
        User.create({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password: req.body.password,
            confirmPassword:req.body.confirmPassword
        }).then(user => {
            if(req.body.roles) {
                Role.findAll({
                    where:{
                        name:{
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(()=> {
                        res.status(200).json({
                            success:true,
                            msg:"User saved successfully..!!"
                        })
                    })
                })
            }else {
                user.setRoles([3]).then(() => {
                    res.send({ message: "User was registered successfully!" });
                  });
            }
            
        }).catch(err => {
            if (err.name === 'SequelizeValidationError') {
              return res.status(400).json({
                success: false,
                msg: err.errors.map(e => e.message)
              })
            }
            else if(err.name==='SequelizeUniqueConstraintError') {
                return res.status(400).json({
                    success: false,
                    msg: err.errors.map(e => e.message)
                  })
            }
            else if(err.name==='Password and confirm must be same') {
                return res.status(400).json({
                    success: false,
                    msg:'Password and confirm must be same'
                  })
            }
            console.log(err.message);
            return res.status(400).json({
                success: false,
                msg: err.message
              })
          }
        )
}

exports.signin = (req,res) => {
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(user => {
        if(!user) {
            return res.status(404).json({
                success: false,
                msg:"Invalid email or password"
            })
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
        if(!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid email or password!"
            });
        }
        var token = jwt.sign({id:user.id},config.secret,{
            expiresIn: 86400
        });
        var authorities = [];
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            username: user.firstName,
            email: user.email,
            roles: authorities,
            accessToken: token
          });
          req.user = user;
        });
      }).catch(err => {
        console.log(err);
        res.status(500).send({msg:err.message});
    });
};

exports.createSemiAdmin = (req,res) => {
    User.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password: req.body.password,
        confirmPassword:req.body.confirmPassword
    }).then(user => {
        if(req.body.roles) {
            Role.findAll({
                where:{
                    name:{
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(()=> {
                    res.status(200).json({
                        success:true,
                        msg:"User saved successfully..!!"
                    })
                })
            })
        }else {
            user.setRoles([3]).then(() => {
                res.send({ message: "User was registered successfully!" });
              });
        }
    }).catch(err => {
        if (err.name === 'SequelizeValidationError') {
          return res.status(400).json({
            success: false,
            msg: err.errors.map(e => e.message)
          })
        }
        else if(err.name==='SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                msg: err.errors.map(e => e.message)
              })
        }
         else {
            console.log(err);
            return res.status(400).json({
                success: false,
                msg:err
            })
        }
      }
    )

}




exports.getAllSurveys = (req,res) => {

    if(req.userRole=="superadmin") {
        Survey.findAll().then((sd)=>{
            
            return res.status(200).json({
                success: true,
                msg:'The survey  are ',
                data:{
                    sd
                }
            })
        }).catch(err => {
            return res.status(400).json({
                success:false,
                msg:err.message
            })
        })
    }

    else {
        User.findByPk(req.userId,{include:['surveys']}).then((surveydata)=>{
            const data = surveydata.surveys;
            return res.status(200).json({
                success: true,
                msg:'The surveys are ',
                data:{
                    data
                }
            })
        }).catch(err => {
            return res.status(400).json({
                success:false,
                msg:err.message
            })
        })
    }
    
}

