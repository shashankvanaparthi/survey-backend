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
  
module.exports = db;
