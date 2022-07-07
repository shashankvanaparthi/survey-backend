const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const app        = express();
const db         = require('./app/models');
const Role       = db.role;
var corsOptions  = {
    origin:"*"
};
app.use(cors(corsOptions));
app.options('*',cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/",(req,res) => {
    res.json({message:'Welcome to app'});
})

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
    console.log("DB connected sucessfully..!!");
    /*initial();*/
});

function initial() {
    Role.create({
        id: 1,
        name: "superadmin"
      });
    
}

require("./app/routes/routes.js")(app);

app.listen(PORT,() => {
    console.log("Server is running ${PORT}");
})
