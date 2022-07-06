module.exports = {
    HOST: "localhost",
    USER: "biswitha",
    PASSWORD: "biswitha",
    DB: "surveydb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };