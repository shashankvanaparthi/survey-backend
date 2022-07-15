module.exports = (sequelize,Sequelize) => {
    const Options = sequelize.define("options",{
        value : {
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notEmpty: {
                    args: true,
                    msg:"option can\'t be empty..!"
                },
            }
        }
    })
    return Options;
}