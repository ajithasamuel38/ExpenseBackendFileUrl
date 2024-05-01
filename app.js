const express = require("express");
const bodyParser = require("body-parser");
const helmet = require('helmet');
const path =require('path');
const fs = require('fs');
const morgan = require('morgan');

const sequelize = require("./config/db"); 

const adminroutes = require("./routes/adminroutes")

const expenseroutes = require("./routes/expenseroutes")

const purchaseroutes = require("./routes/premiumroutes");
const premiumeroutes = require("./routes/leaderboard");
const forgotpassroutes = require('./routes/forgotpass');
const errorController = require('./controllers/error');

const User = require("./models/user");
const Expense = require("./models/expense");
const Order = require("./models/orders");
const Forgotpass = require("./models/forgotpass");
const FileUrl = require('./models/FileUrl');
const cors = require('cors'); 

const app = express();
app.use(helmet());
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));
app.use(bodyParser.json());

app.use(cors());



app.use(adminroutes);
app.use(expenseroutes);
app.use(purchaseroutes);
app.use(premiumeroutes);
app.use(forgotpassroutes);
app.use(errorController.get404);

User.hasMany(Expense, { as: 'expense'});
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpass);
Forgotpass.belongsTo(User);

User.hasMany(FileUrl);
FileUrl.belongsTo(User);

sequelize.sync()
.then((result)=>{
    console.log(result);
    app.listen(process.env.PORT);
}).catch((err)=>{
    console.log(err)
});