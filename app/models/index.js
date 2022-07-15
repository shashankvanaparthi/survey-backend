const dbConfig = require('./../config/db.config.js');
const Sequelize = require('sequelize');
const User = require('./user.model.js');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
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
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('./user.model.js')(sequelize, Sequelize);
db.Survey = require('./survey.model.js')(sequelize, Sequelize);
db.Question = require('./question.model.js')(sequelize, Sequelize);
db.Options = require('./option.model.js')(sequelize, Sequelize);

db.User.hasMany(db.Survey, { as: "surveys" });
db.User.hasMany(db.Question, { as: "questions" });

db.Survey.belongsTo(db.User, {
  foreignKey: "userId",
  as: "userid",
});

db.Survey.belongsToMany(db.Question,{
  through: "survey_question",
  as: "questions",
  foreignKey: "surveyId"
})

db.Question.belongsToMany(db.Survey, {
  through: "survey_question",
  as: "surveys",
  foreignKey: "questionId"
});

db.Question.hasMany(db.Options, { as: "options" });
db.Options.belongsTo(db.Question, {
  foreignKey: "questionId",
  as: "questionid",
});

module.exports = db;
