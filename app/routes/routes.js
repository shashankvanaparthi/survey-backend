module.exports = app => {
    const User = require('../controllers/user.controller.js');
    const Survey = require('../controllers/survey.controller.js');
    const Question = require('../controllers/question.controller.js');
    const Report = require('../controllers/reports.controller')
    const authJwt = require('../middleware/authJwt.js');
    var router = require('express').Router();
    //user routes
    router.post('/signin',User.signin); 
    router.post('/signup',User.signup);
    router.get("/user/all",User.getAllUsers)
    router.get("/user/:id",User.getUserDetails)
    router.put("/user/:id",User.updateUserDetails)
    router.delete("/user/:id",User.deleteUser)
    
    //Survey routes
    router.post('/createSurvey',Survey.createSurvey);
    router.get('/survey/user/:id',Survey.getAllSurveysForUser);
    router.put('/survey/:id',Survey.editSurvey);
    router.delete('/survey/:id',Survey.deleteSurvey);
    router.get('/survey/all/',Survey.getAllSurveys);
    router.get('/survey/:id',Survey.getAllSurveyQuestions);
    router.post('/survey/addQuestion',Survey.addQuestionToSurvey);
    router.delete('/survey/question/deleteQuestion',Survey.deleteQuestionFromSurvey)
    router.get('/surveyForReports',Survey.getSurveysForReports)

    //Question routes
    router.post('/addQuestion/:id',Question.saveQuestionForUser);    
    router.delete('/deleteQuestion/:id',Question.deleteQuestion);
    router.get("/questions/user/:id",Question.getAllQuestionsForUser)
    
    //Reports routes
    router.post("/saveReport",Report.saveReport)
    router.get("/getReport/:id",Report.getReport)

    app.use('/api/v1/',router);

}