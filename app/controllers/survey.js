const db = require('../models');
const Survey = db.Survey;
const User = db.User;

exports.editSurvey = async (req,res) => {
    try {
        const survey = await Survey.findByPk(req.params.id);
        if(!survey) {
            return res.status(404).json({
                success:false,
                msg:'survey not found'
            })
        }
        if(req.userRole==="superadmin") {
            return res.status(200).json({
                success:true,
                data:{
                    survey
                }
            })
        }
        if(req.userId!==req.survey.dataValues.userId) {
            return res.status(403).json({
                success:false,
                msg:'You are unauthorized to edit that survey'
            })
        }
        req.survey = survey;
        return res.status(200).json({
            success:true,
            data:{
                survey
            }
        })
    }
    catch (e) {
        return res.status(400).json({
            success:false,
            msg:e.message
        })
    }
}

exports.deleteSurvey = async (req,res) => {
    try {
        const survey = await Survey.findByPk(req.params.id);
        if(!survey) {
            return res.status(404).json({
                success:false,
                msg:'Enter a valid Survey number'
            })
        }
        const delSurvey = await Survey.destroy({where:{id:req.params.id}});
        res.status(200).json({
            success:true,
            msg:'Question deleted Sucessfully',
            data:{
                delSurvey
            }
        });
    }
    catch (e) {
        return res.status(400).json({
            success:false,
            msg:e.message
        })
    }
}


exports.getAllSurveyQuestions = (req,res) => {
    
    Survey.findByPk(req.survey.dataValues.id,{include:['questions']}).then((surveydata)=>{
        const questions = surveydata.questions;
        res.status(200).json({
            success: true,
            msg:'The survey questions are ',
            data:{
                questions
            }
        })
    }).catch(err => {
        res.status(400).json({
            success:false,
            msg:err.message
        })
    })
}


exports.createSurvey = (req,res) => {
    console.log("The user id is "+req.user);
    Survey.create({
        description:req.body.description,
        userId:req.userId
    }).then((survey) => {
        return res.status(200).json({
            success: true,
            msg:'The survey is created'
        })
    }).catch(err => {
        return res.status(400).json({
            success:false,
            msg:err.message
        })
    })
}