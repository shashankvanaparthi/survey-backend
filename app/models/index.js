const dbConfig = require('./../config/db.config.js');
const Sequelize = require('sequelize');
const User = require('./../models/user.js');

const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize  = Sequelize;
db.sequelize  = sequelize;
db.User = require('./user.js')(sequelize,Sequelize);
db.role = require('./roles.js')(sequelize,Sequelize);
db.Survey = require('./survey.js')(sequelize,Sequelize);
db.Question = require('./question.js')(sequelize,Sequelize);
db.Options = require('./options.js')(sequelize,Sequelize);
db.role.belongsToMany(db.User, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
  });
db.User.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
  });
db.ROLES = ["superadmin", "semiadmin", "user"];
db.User.hasMany(db.Survey,{as:"surveys"});
db.Survey.belongsTo(db.User,{
    foreignKey : "userId",
    as:"userid",
  });

  db.Survey.hasMany(db.Question,{as:"questions"});
  db.Question.belongsTo(db.Survey,{
    foreignKey:"surveyId",
    as:"surveyid",

  });

  db.Question.hasMany(db.Options,{as:"options"});
  db.Options.belongsTo(db.Question,{
    foreignKey:"questionId",
    as:"questionid",

  });

  db.Survey.hasMany(db.Question, {
    onDelete: 'cascade',
    hooks: true,
  });

  db.Question.hasMany(db.Options,{
    onDelete: 'cascade',
    hooks: true,
  })

  
module.exports = db;
