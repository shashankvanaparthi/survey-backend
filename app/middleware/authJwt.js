const jwt = require('jsonwebtoken');
const config = require('./../config/config.js');
const db = require('./../models');
const User = db.User;
const Survey = db.Survey;
const Question = db.Question;

verifyToken = (req,res,next) => {
    let token = req.headers['x-access-token'] || '';
    if(!token) {
        return res.status(403).send({
            msg:'No token provided.!'
        });
    }
    jwt.verify(token,config.secret,(err,decoded) => {
        if(err) {
            return res.status(403).send({
                msg:'Un authorized'
            })
        }
        req.userId = decoded.id;
        next();
    });
}

isSuperAdmin = (req,res,next) => {
    User.findByPk(req.userId).then(user => {
        if(!user) {
            return res.status(403).send({
                msg:'You are not a valid user please try singn in again and come back..!'
            })
        }
        user.getRoles().then(roles => {
            for(let i=0;i<roles.length;i++) {
                if(roles[i].name==="superadmin") {
                    next();
                    return;
                }
            }
            return res.status(403).send({
                msg:'You are not authorized to access this request.!'
            })
        })
    })
}

isSuperOrSemiAdmin = (req,res,next) => {
    User.findByPk(req.userId).then(user => {
        if(!user) {
            return res.status(403).send({
                msg:'You are not a valid user please try singn in again and come back..!'
            })
        }
        user.getRoles().then(roles => {
            for(let i=0;i<roles.length;i++) {
                if(roles[i].name==="superadmin"||roles[i].name==="semiadmin") {
                    req.userRole = roles[i].name;
                    next();
                    return;
                }
            }
            return res.status(403).send({
                msg:'You are not authorized to access this request.!'
            })
        })
    }).catch(err => {
        console.log(err);
    })
}

/*isSurveyCreated = (req,res,next) => {
    Survey.findByPk(req.survey.dataValues.id).then(survey => {
        if(!survey) {
            res.status(400).json({
                success:false,
                msg:'Create a Survey first'
            }) 
        }
        next();
    }).catch(err => {
        return res.status(400).send({
            msg:err.message
        })
    })
}*/

isSurveyValid = (req,res,next) => {
    Survey.findByPk(req.params.id).then(survey => {
        if(!survey) {
            return res.status(400).json({
                success:false,
                msg:'Invalid Survey please enter a valid survey'
            }) 
        }
        req.survey = survey;
        next();
    }).catch(err => {
        return res.status(400).send({
            msg:err.message
        })
    })
}

isQuestionValid = (req,res,next) => {
    Question.findByPk(req.params.id).then(question => {
        if(!question) {
            return res.status(400).json({
                success:false,
                msg:'Invalid Question please enter a valid One'
            }) 
        }
        req.question = question;
        next();
    }).catch(err => {
        return res.status(400).send({
            msg:err.message
        })
    })
}

isUserCreatedSurvey = (req,res,next) => {
    if(req.userRole==="superadmin") {
        next();
        return;
    }
    if(req.userId!==req.survey.dataValues.userId) {
        return res.status(403).json({
            success:false,
            msg:'You are unauthorized to edit that survey'
        })
    }
    next();
}

isSurveySelected = (req,res,next) => {
    /*console.log(req);
    if(req.survey==undefined) {
        return res.status(403).json({
            success:false,
            msg:'select a  survey first'
        })
    }*/
    next();
}

const authJwt = {
    verifyToken : verifyToken,
    isSuperAdmin : isSuperAdmin,
    isSuperOrSemiAdmin:isSuperOrSemiAdmin,
    isSurveyValid:isSurveyValid,
    isUserCreatedSurvey:isUserCreatedSurvey,
    isSurveySelected:isSurveySelected,
    isQuestionValid:isQuestionValid
}

module.exports = authJwt;