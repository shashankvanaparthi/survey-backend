const db = require('../models');
const Survey = db.Survey;

exports.editSurvey = async (req, res) => {
    const userId = req.body.userId;
    const survey = req.body.survey;
    Survey.update({ title: survey.title, description: survey.description }, { where: { userId: userId, id: survey.id } }).then(response => {
        console.log(response)
        res.status(200).json({ "message": "Update Success" })
    }, error => {
        console.log(error)
    })
}

exports.deleteSurvey = async (req, res) => {
    const survey = await Survey.findByPk(req.params.id);
    if (!survey) {
        return res.status(404).json({
            success: false,
            message: 'Enter a valid Survey number'
        })
    }
    const delSurvey = await Survey.destroy({ where: { id: req.params.id } });
    res.status(200).json({
        success: true,
        message: 'Survey deleted Sucessfully',
        data: {
            delSurvey
        }
    });
}

exports.getAllSurveysForUser = async (req, res) => {
    const userId = req.params.id;
    console.log("getAllSurveysForUser is called "+userId)
    const surveys = await Survey.findAll(
        {where: { userId: userId }}
    )
    res.status(200).json(surveys);
}



exports.getAllSurveyQuestions = (req, res) => {

    Survey.findByPk(req.survey.dataValues.id, { include: ['questions'] }).then((surveydata) => {
        const questions = surveydata.questions;
        res.status(200).json({
            success: true,
            msg: 'The survey questions are ',
            data: {
                questions
            }
        })
    }).catch(err => {
        res.status(400).json({
            success: false,
            msg: err.message
        })
    })
}


exports.createSurvey = async (req, res) => {
    const created_survey = await Survey.create({
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId
    })
    if (created_survey) {
        res.status(200).json({
            success: true,
            message: 'The survey is created'
        })
    } else {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}