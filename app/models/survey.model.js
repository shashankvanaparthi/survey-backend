module.exports = (sequelize, Sequelize) => {
    const Survey = sequelize.define("survey", {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Title can\'t be empty..!"
                }
            }
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "description can\'t be empty..!"
                },
                len: {
                    args: [4, 26],
                    msg: 'Please provide description field within 4 to 26 characters.'
                }
            }
        }
    })
    return Survey;
}