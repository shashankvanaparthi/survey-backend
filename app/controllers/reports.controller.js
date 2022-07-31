const db = require('../models');
const optionModel = require('../models/option.model');
const Reports = db.Reports;
const Answers = db.Answers;
const Questions = db.Question;
const Options = db.Options

exports.saveReport = async (req, res) => {
    console.log("In Save Report") 
    Reports.create({
        name: req.body.name,
        email: req.body.email,
        surveyId: req.body.surveyId,
        answers: req.body.answers,
    }, {
        include: [
            {
                model: Answers,
                as: "answers"
            }
        ],
    }).then(async report => {
        res.status(200).json({
            success: true,
            msg: 'Report saved Sucessfully',
            data: { report }
        })
    }).catch(err => {
        console.log(err)
        res.status(400).json({ success: false, msg: err.message })
    })
}

exports.getReport = async (req,res) =>{
    console.log("In getReports controller");
    const surveyId = req.params.id;
    console.log(surveyId);
    const reports = await Reports.findAll({
        where:{
            surveyId:surveyId
        },
        include: [{
            model: Answers,
            as: "answers",
            include: [{model:Questions,as:"question"},{model:Options,as:"answer"}]
        }]
    })
    res.status(200).json(reports)
}

exports.getAllAnswers = async (req,res) => {
    console.log("In getAllAnswers");
    const answers = await Answers.findAll();
    res.status(200).json(answers)
}

