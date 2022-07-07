module.exports = app => {
    const User = require('../controllers/user.js');
    const Survey = require('../controllers/survey.js');
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

    app.use('/api/v1/user',router);

}