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

exports.getUserDetails= async (req,res)=>{
    const userId = req.params.id
    const user = await User.findOne(
      {
        where:{
          id: userId
        },
        attributes: {exclude: ['password']},
      }
    )
    res.status(200).json(user)
  }
  
  
  exports.updateUserDetails = async (req,res)=>{
    const userDetails = req.body.user;
    User.update({firstName:userDetails.firstName,lastName:userDetails.lastName},{ where: { id: userDetails.id } }).then(response=>{
      res.status(200).json({ "message": "Update Success" })
    },err=>{
      console.log(err)
      res.status(400).json({"error":"something Went Wrong"})
    })
  }

exports.getAllUsers = async (req,res)=>{
    const users = await User.findAll(
        {
          where:{
            isAdmin: false
          },
          attributes: {exclude: ['password']},
        })
        res.status(200).json(users)
}


exports.deleteUser = async (req,res)=>{
    const userId = req.params.id;
    const user = await User.findOne({where: {id: userId}})
    if(!user){
        res.status(404).json({message:"User Not found"});
    }else{
        const delUser = await User.destroy({where:{id:userId}})
        res.status(200).json({
            success: true,
            message: 'User deleted Sucessfully',
            data: {
                delUser
            }
        });
    }
}