module.exports = (sequelize, Sequelize) => {
    const Answer = sequelize.define("answers", {
        answer: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Answer can\'t be empty..!"
                }
            }
        }
    })
    return Answer;
}