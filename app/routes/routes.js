module.exports = app => {
    const User = require('../controllers/user.js');
    const authJwt = require('../middleware/authJwt.js');
    var router = require('express').Router();
    //user routes
    router.post('/',User.create);
    router.post('/signin',User.signin);
    router.post('/createSemiAdmin',authJwt.verifyToken,authJwt.isSuperAdmin,User.createSemiAdmin);

    app.use('/api/v1/user',router);

}