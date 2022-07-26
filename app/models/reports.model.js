module.exports = (sequelize,Sequelize) => {
    const Report = sequelize.define("reports",{
        name: {
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notEmpty: {
                    args: true,
                    msg:"UserName can't be empty"
                }
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull:false,
            validate: {
                notEmpty: {
                    args: true,
                    msg:"Email can\'t be null..!"
                },
                isEmail: {
                    msg:"Must be a valid email address"
                }
            }
        }
    })
    return Report;
}