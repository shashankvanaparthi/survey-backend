const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const db = require('./app/models');
const users = require('./app/controllers/user.controller.js');

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.json({ message: 'Welcome to survey application' });
})



db.sequelize.sync({alter:true}).then(async () => {
    console.log("DB connected sucessfully..!!");
    /*initial();*/
    // Create Admin User 
    isAdminPesent = await users.isUserPresent("admin@gmail.com");
    if(isAdminPesent){
        console.log("Admin ALready Present");
        return;
    }
    console.log("Creating Admin User");
    const adminUser = await users.createUser({email:"admin@gmail.com",password:"admin@123",firstName:"Admin",isAdmin:true});
    if(adminUser){
        console.log("Admin User Created Successfully")
    }else{
        console.log("Error while creating admin user, Please restart the backend")
    }
});

require("./app/routes/routes.js")(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}.`);
})
