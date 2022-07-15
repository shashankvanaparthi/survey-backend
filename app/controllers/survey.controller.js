const { Question } = require('../models');
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
    console.log("In deleteSurvey is called")
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
    console.log("getAllSurveysForUser is called " + userId)
    const surveys = await Survey.findAll(
        {
            include: [{
                model: Question,
                as: "questions"
            }],
            where: { userId: userId }
        }
    )
    res.status(200).json(surveys);
}

exports.addQuestionToSurvey = async (req,res) => {
    const surveyId = req.body.surveyId;
    const questId = req.body.questId;
    console.log("SurveyId: ", surveyId, "QuestId: ", questId);
    const survey = await Survey.findByPk(surveyId)
    if (!survey) {
        console.log("Survey Not Found")
        res.status(404).json({ "message": "Survey Not Found" })
    }

    const question = await Question.findByPk(questId);
    if (!question) {
        console.log("Question Not Found");
        res.status(404).json({ "message": "Question Not Found" })
    }
    await survey.addQuestion(question);
    res.status(200).json(survey);
}

exports.deleteQuestionFromSurvey = async (req,res)=>{
    console.log("deleteQuestionFromSurvey is called");
    const surveyId = req.query.surveyId;
    const questId = req.query.questId;
    console.log("SurveyId: ",surveyId,"QuestId: ",questId);
    const survey = await Survey.findByPk(surveyId)
    if(!survey){
        console.log("Survey Not Found")
        res.status(404).json({"message":"Survey Not Found"})
    }

    const question = await Question.findByPk(questId);
    if(!question){
        console.log("Question Not Found");
        res.status(404).json({"message":"Question Not Found"})
    }
    await survey.removeQuestion(question);
    res.status(200).json(survey);
}

exports.getAllSurveyQuestions = async (req, res) => {
    const surveyId = req.params.id;
    const userId = req.query.userId;
    console.log(surveyId);
    console.log(req)
    const sureveyDetails = await Survey.findByPk(surveyId,
        {
            include: [{
                model: Question,
                as: "questions"
            }],
            where: { userId: userId }
        })
    console.log(sureveyDetails)
    res.status(200).json(sureveyDetails)
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