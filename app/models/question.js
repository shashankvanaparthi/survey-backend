module.exports = (sequelize,Sequelize) => {
    const Question = sequelize.define("questions",{
        description : {
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notEmpty: {
                    args: true,
                    msg:"Question description can\'t be empty..!"
                },
                len: {
                    args: [4,520],
                    msg: 'Please provide Question field within 4 to 520 characters.'
                  }
            }
        }
    })
    return Question;
}