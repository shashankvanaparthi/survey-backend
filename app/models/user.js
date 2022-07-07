const crypto = require('crypto');
var bcrypt = require("bcryptjs");
module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define("user",{
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg:"First name can\'t be empty..!"
                },
                len: {
                    args: [4,26],
                    msg: 'Please provide first name field within 4 to 26 characters.'
                  }
                
            }
        },
        lastName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    args: true,
                    msg:"Email can\'t be null..!"
                },
                isEmail: {
                    msg:"Must be a valid email address"
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
                notEmpty:{
                    args:true,
                    msg:"Password can\'t be empty"
                },
                len: {
                    args: [8, 200],
                    msg: 'Please provide Password field within 8 to 200 characters.'
                  }
            }
        },
        confirmPassword:{
            type: Sequelize.STRING,
            allowNull:false,
            validate:{
                notEmpty:{
                    args:true,
                    msg:"Password can\'t be empty"
                },
                len: {
                    args: [8, 200],
                    msg: 'Please provide Password field within 8 to 200 characters.'
                  }
            }
        },
        passwordResetToken:{
            type:Sequelize.STRING,
            default:""
        },
        passwordResetExpires : {
            type:Sequelize.DATE,
            default:null
        }
    })
    User.prototype.createPasswordResetToken = function() {
        const resetToken = crypto.randomBytes(32).toString('hex');
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.passwordResetExpires = Date.now() + 10 *60 *1000;
        console.log(this.passwordResetToken);
        return resetToken;
    }

    User.addHook('beforeSave', (user,opt) => {
        if(user.password !== user.confirmPassword) {
            throw new Error('Password and confirm must be same');
        }
    })

    User.addHook('beforeSave', async (user,options)=> {
        const salt = await bcrypt.genSalt(10);
        user.password = bcrypt.hashSync(user.password, salt);
        user.confirmPassword = user.password;
    });




    return User;
};