module.exports = (sequelize,Sequelize) => {
    const Options = sequelize.define("options",{
        description : {
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notEmpty: {
                    args: true,
                    msg:"option can\'t be empty..!"
                },
                len: {
                    args: [4,206],
                    msg: 'Please provide option field within 4 to 206 characters.'
                  }
                }
        }
    })
    return Options;
}