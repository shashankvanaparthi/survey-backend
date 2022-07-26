const { Survey } = require('../models');
const db = require('../models');
const Question = db.Question;
const Option = db.Options;


exports.deleteQuestion = async (req, res) => {
    try {
        const quesId = req.body.quesId;
        const userId = req.params.id;
        const ques = await Question.findByPk(quesId);
        if (!ques) {
            return res.status(404).json({
                success: false,
                message: 'Enter a valid Question number'
            })
        }
        const delQuestion = await Question.destroy({ where: { id: quesId, userId:userId } });
        res.status(200).json({
            success: true,
            message: 'Question deleted Sucessfully',
            data: {
                delQuestion
            }
        });
        // res.status(200).json({message:"OK"})
    }
    catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }


}

exports.saveQuestionForUser = (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    Question.create({
        question: req.body.question,
        questionType: req.body.questionType,
        options: req.body.options,
        userId: userId
    }, {
        include: [
            {
                model: Option,
                as: "options"
            }
        ],
    }).then(async ques => {
        console.log(ques)
        res.status(200).json({
            success: true,
            msg: 'Question created Sucessfully',
            data: { ques }
        })
    }).catch(err => {
        console.log(err)
        res.status(400).json({ success: false, msg: err.message })
    })
}

exports.saveQuestionForSurvey = async (req, res) => {
    console.log("Save Track is called")
    const surveyId = req.body.surveyId;
    const question = req.body.question;
    const survey = await Survey.findOne({ where: { id: surveyId } })
    if (survey) {
        console.log(survey)
        survey.createQuestion(question).then(response => {
            res.status(200).json(response)
        }, error => {
            res.status(400).json({ "message": "Some Error occured" })
            console.log(error)
        })
    }
}

exports.getAllQuestionsForUser = async (req, res) => {
    console.log("In getAll questions");
    const userId = req.params.id;
    const questions = await Question.findAll({
        where: {
            userId: userId
        },
        include: [{
            model: Option,
            as: "options"
        }]
    })
    console.log(questions)
    res.status(200).json(questions)
}
