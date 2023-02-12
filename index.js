const express = require('express');
const app = express();
const path = require('path'); //
const port = 3000;
const bodyParser = require('body-parser');
const sql = require('./DB/db'); // connection to db on the server  //
const createDB = require("./DB/createDB"); 

app.use(express.static(__dirname + '/views'));
app.use('/static', express.static(__dirname + "/static"));
app.use("/views", express.static(__dirname + "/views"));
app.use("/css", express.static(__dirname + "/static/css"));
app.use("/js", express.static(__dirname + "/static/js"));
app.use("/graphics", express.static(__dirname + "/static/graphics"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/createTables", createDB.createTables);
app.get("/insertTables", createDB.insertTables);

//handling forms
app.post("/login", createDB.login);
app.post('/createUser', createDB.insertNewUser);
app.post('/createRequest', createDB.insertNewRequest);
app.post('/createContactRequest', createDB.insertNewContactReq);


//routes for showing all tables
app.get("/showAllUsers", createDB.showUsers);
app.get("/showAllTranslators", createDB.showTranslators);
app.get("/showAllContacts", createDB.showContacts);
app.get("/showAllRequests", createDB.showRequests);

//route for dropping tables  
app.get("/dropcontacts", createDB.dropContacts);
app.get("/dropTranslators", createDB.dropTranslators);
app.get("/dropRequests", createDB.dropRequests);
app.get("/dropUsers", createDB.dropUsers);


app.listen(port, ()=>{
    console.log("srever is running on port " + port);
})

