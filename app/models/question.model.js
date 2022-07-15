module.exports = (sequelize,Sequelize) => {
    const Question = sequelize.define("questions",{
        question : {
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notEmpty: {
                    args: true,
                    msg:"Question description can\'t be empty..!"
                }
            }
        },
        questionType: {
            type: Sequelize.ENUM,
            values: ['CHOICE','BOOLEAN','SCALE']
        }
    })
    return Question;
}