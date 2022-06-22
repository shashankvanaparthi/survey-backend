const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
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
// db.users = require("./user.model.js")(sequelize, Sequelize);
// db.album = require("./album.model.js")(sequelize, Sequelize);
// db.artist = require("./artist.model.js")(sequelize, Sequelize);
// db.track = require("./track.model.js")(sequelize, Sequelize);

// db.users.hasMany(db.album)
// db.users.hasMany(db.track)
// db.users.hasMany(db.artist)

// db.album.belongsToMany(db.track,{
//   through: "album_track",
//   as: "tracks",
//   foreignKey: "albumId"
// })

// db.track.belongsToMany(db.album, {
//   through: "album_track",
//   as: "albums",
//   foreignKey: "trackId"
// });

// db.album.belongsTo(db.artist, {
//   foreignKey: {
//     name: 'artistId',
//     allowNull: true,
//     as:"artist"
//   }
// })

module.exports = db;