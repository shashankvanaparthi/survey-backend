module.exports = app => {
    const User = require('../controllers/user.js');
    const Survey = require('../controllers/survey.js');
    const Question = require('../controllers/question.js');
    const Option = require('../controllers/option.js');
    const authJwt = require('../middleware/authJwt.js');
    var router = require('express').Router();
    //user routes
    router.post('/',User.create);
    router.post('/signin',User.signin);
    router.post('/createSemiAdmin',authJwt.verifyToken,authJwt.isSuperAdmin,User.createSemiAdmin);
    //Survey routes
    router.post('/createSurvey',authJwt.verifyToken,authJwt.isSuperOrSemiAdmin,Survey.createSurvey);
    router.get('/getAllSurveys',authJwt.verifyToken,authJwt.isSuperOrSemiAdmin,User.getAllSurveys);
    router.get('/editSurvey/:id',authJwt.verifyToken,authJwt.isSuperOrSemiAdmin,authJwt.isSurveyValid,authJwt.isUserCreatedSurvey,Survey.editSurvey);
    router.delete('/deleteSurvey/:id',authJwt.verifyToken,authJwt.isSuperOrSemiAdmin,authJwt.isSurveyValid,authJwt.isUserCreatedSurvey,Survey.deleteSurvey);
    router.get('/getSurveyQuestions/:id',authJwt.verifyToken,authJwt.isSuperOrSemiAdmin,authJwt.isSurveyValid,authJwt.isUserCreatedSurvey,Survey.getAllSurveyQuestions);

    //Question routes
    router.post('/addQuestion/:id',authJwt.verifyToken,authJwt.isSuperOrSemiAdmin,authJwt.isSurveyValid,authJwt.isUserCreatedSurvey,Question.createQuestion);    
    router.patch('/editQuestion/:id',authJwt.verifyToken,authJwt.isSuperOrSemiAdmin,Question.editQuestion);
    router.delete('/deleteQuestion/:id',authJwt.verifyToken,authJwt.isSuperOrSemiAdmin,Question.deleteQuestion);

    //option routes
    router.post('/addOption/:id',authJwt.verifyToken,authJwt.isSuperOrSemiAdmin,authJwt.isQuestionValid ,Option.createOption);
    router.patch('/editOption/:id',authJwt.verifyToken,authJwt.isSuperOrSemiAdmin,Option.editOption);
    router.delete('/deleteOption/:id',authJwt.verifyToken,authJwt.isSuperOrSemiAdmin,Option.deleteOption);
    
    app.use('/api/v1/user',router);

}