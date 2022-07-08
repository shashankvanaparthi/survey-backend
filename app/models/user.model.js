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
        isAdmin:{
            type: Sequelize.BOOLEAN,
            default:false,
        }
    })

    return User;
};