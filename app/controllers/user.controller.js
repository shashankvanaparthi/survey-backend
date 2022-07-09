const db = require('../models');
const User = db.User;
const Survey = db.Survey;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = async (req, res) => {
    const user = await this.isUserPresent(req.body.email)
    console.log(user)
    if (user) {
        res.status(409).json({ message: "User Already Exist" })
        return;
    }
    const created_user = await this.createUser(req.body);
    res.status(201).json(created_user);
};

exports.createUser = async (data) => {
    const salt = await bcrypt.genSalt(10);
    var usr = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: await bcrypt.hash(data.password, salt),
        isAdmin: data.isAdmin == true
    };

    const created_user = await User.create(usr);
    // console.log(created_user)
    return created_user;
}

exports.isUserPresent = async (email) => {
    const user = await User.findOne({ where: { email: email } });
    if (user) return true;
    else return false;
}

exports.signin = (req, res) => {
    console.log("Sigin method is called");
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            console.log("User email or password not exist");
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid email or password!"
            });
        }
        var token = jwt.sign({ id: user.id }, process.env.SECRETE);
        res.status(200).send({
            id: user.id,
            username: user.firstName,
            email: user.email,
            accessToken: token,
            isAdmin: user.isAdmin
        })
    }).catch(err => {
        console.log(err);
        res.status(500).send({ message: err.message });
    });
};

exports.getAllSurveysForAdmin = async (req, res) => {
    const surveys = await Survey.findAll()
    res.status(200).json(surveys);
}

