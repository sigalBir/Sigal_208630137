const sql = require("./db");
const path = require("path");
const csv = require("csvtojson");

const createTables = (req, res) => {
    if (!res.headersSent) usersTable(req,res);
    if (!res.headersSent) tanslatorsTable(req, res);
    if (!res.headersSent) contactsTable(req, res);
    if (!res.headersSent) requestsTable(req, res);
    if (!res.headersSent) res.send("All Tables created successfully");
};

const insertTables = (req, res) => {
    if (!res.headersSent) InsertDataUsers(req, res);
    if (!res.headersSent) InsertDataTranslators(req, res);
    if (!res.headersSent) InsertDataContacts(req, res);
    if (!res.headersSent) InsertDataRequests(req, res);
    if (!res.headersSent) res.send("All Tables data inserted successfully");
};


// creating all tables 
const usersTable = (req,res)=>{
    const q1 = `CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT,
        username VARCHAR(25) NOT NULL,
        password VARCHAR(25) NOT NULL,
        email VARCHAR(50) NOT NULL,
        phoneNumber VARCHAR(15) NOT NULL,
        joinDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    )`;
    sql.query(q1, (err, mysqlres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating users table" + err});
            return;
        }
        console.log("users table created succesfuly");
    });
};
const tanslatorsTable = (req,res)=>{
    const q2 = `CREATE TABLE IF NOT EXISTS translators (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
        username varchar(25) NOT NULL, 
        firstname varchar(25) NOT NULL, 
        lastname varchar(25) NOT NULL, 
        password varchar(25) NOT NULL,  
        email varchar(50) NOT NULL, 
        joinDate date default(CURRENT_DATE), 
        phoneNumber varchar(15) NOT NULL, 
        erea varchar(25) NOT NULL, 
        gender varchar(25) NOT NULL, 
        languages varchar(50) NOT NULL
    )`;
    sql.query(q2, (err, mysqlres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating translators table" + err});
            return;
        }
        console.log("translators table created succesfuly");
    });
};
const contactsTable = (req,res)=>{
    const q1 = `CREATE TABLE IF NOT EXISTS contacts (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
        fullName varchar(25) NOT NULL, 
        email varchar(50) NOT NULL, 
        createdDate date default(CURRENT_DATE) NOT NULL, 
        message varchar(500) NOT NULL 
    )`;
    sql.query(q1, (err, mysqlres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating contacts table" + err});
            return;
        }
        console.log("contacts table created succesfuly");
    });
};

const requestsTable = (req,res)=>{
    const q1 = `CREATE TABLE IF NOT EXISTS requests  (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
        firstName varchar(25) NOT NULL, 
        lastName varchar(25) NOT NULL, 
        email varchar(50) NOT NULL, 
        phoneNumber varchar(25) NOT NULL, 
        createdDate date default(CURRENT_DATE) NOT NULL, 
        dueDate date NOT NULL, 
        details varchar(500) NOT NULL
    )`;
    sql.query(q1, (err, mysqlres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating requests table" + err});
            return;
        }
        console.log("requests table created succesfuly");
    });
};



//fill tables from csv

const InsertDataUsers = (req,res)=>{
    const Q1 = "INSERT INTO users SET ?";
    const csvFilePath= path.join(__dirname, "users.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "username": element.username,
            "password": element.password,
            "email": element.email,
            "phoneNumber": element.phoneNumber
        };
        sql.query(Q1, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    res.send("data inserted");
};

const InsertDataTranslators = (req,res)=>{
    const Q2 = "INSERT INTO translators SET ?";
    const csvFilePath= path.join(__dirname, "translators.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "username": element.username,
            "firstname": element.firstname,
            "lastname": element.lastname,
            "password": element.password,
            "email": element.email,
            "phoneNumber": element.phoneNumber,
            "erea": element.erea,
            "gender": element.gender,
            "languages": element.languages
        }
        sql.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    res.send("data inserted");
};

const InsertDataContacts = (req,res)=>{
    const Q3 = "INSERT INTO contacts SET ?";
    const csvFilePath= path.join(__dirname, "contacts.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "fullName": element.fullName,
            "email": element.email,
            "message": element.message
        }
        sql.query(Q3, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    res.send("data inserted");
};

const InsertDataRequests = (req,res)=>{
    const Q4 = "INSERT INTO requests SET ?";
    const csvFilePath= path.join(__dirname, "requests.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "firstName": element.firstname, 
            "lastName": element.lastname, 
            "email": element.email, 
            "phoneNumber": element.phoneNumber, 
            "dueDate": element.dueDate, 
            "details": element.details
        }
        sql.query(Q4, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    res.send("data inserted");
};


//read tables

const showUsers = (req,res)=>{
    sql.query("SELECT * FROM users", (err, mysqlres) => {
        if (err) {
        console.log("error: ", err);
        res.status(400).send({message: "error in getting all users: " + err});
        return;
        };
        console.log("got all users");
        res.send(mysqlres);
        return;
        });
};
const showTranslators = (req,res)=>{
    sql.query("SELECT * FROM translators", (err, mysqlres) => {
        if (err) {
        console.log("error: ", err);
        res.status(400).send({message: "error in getting all translators: " + err});
        return;
        };
        console.log("got all translators");
        res.send(mysqlres);
        return;
        });
};
const showRequests = (req,res)=>{
    sql.query("SELECT * FROM requests", (err, mysqlres) => {
        if (err) {
        console.log("error: ", err);
        res.status(400).send({message: "error in getting all requests: " + err});
        return;
        };
        console.log("got all requests");
        res.send(mysqlres);
        return;
        });
};
const showContacts = (req,res)=>{
    sql.query("SELECT * FROM contacts", (err, mysqlres) => {
        if (err) {
        console.log("error: ", err);
        res.status(400).send({message: "error in getting all contacts: " + err});
        return;
        };
        console.log("got all contacts");
        res.send(mysqlres);
        return;
        });
};

// drop tables 
const dropUsers = (req, res) => {
    sql.query("DROP TABLE users", (err, mysqlres)=>{
        if (err) {
            console.log("error in dropping users table ", err);
            res.status(400).send({message: "error in dropping users table: " + err});
            return;
        }
        console.log("dropped users table");
    });
};
const dropRequests = (req, res) => {
    sql.query("DROP TABLE requests", (err, mysqlres)=>{
        if (err) {
            console.log("error in dropping requests table ", err);
            res.status(400).send({message: "error in dropping requests table: " + err});
            return;
        }
        console.log("dropped requests table");
    });
};
const dropContacts = (req, res) => {
    sql.query("DROP TABLE contacts", (err, mysqlres)=>{
        if (err) {
            console.log("error in dropping contacts table ", err);
            res.status(400).send({message: "error in dropping contacts table: " + err});
            return;
        }
        console.log("dropped contacts table");
    });
};
const dropTranslators = (req, res) => {
    sql.query("DROP TABLE translators", (err, mysqlres)=>{
        if (err) {
            console.log("error in dropping translators table ", err);
            res.status(400).send({message: "error in dropping translators table: " + err});
            return;
        }
        console.log("dropped translators table");
    });
};


//טיפול בבקשות

const login = (req,res)=>{
    // validate body exists
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    // insert input data from body into json
    const user = {
        "username": req.body.username,
        "password": req.body.password,
    }

    // run query
    const Q1 = `SELECT * FROM users WHERE username = '${user.username}' AND password = '${user.password}' LIMIT 1`;
    sql.query(Q1, user, (err, data, fields) =>{
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message:"error in signUp" + err});
            return;
        }
        else {
            console.log("user exist!");
            res.json({data});
            return;
        }
    })
};

const insertNewUser = (req,res)=>{
    // validate body exists
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    // insert input data from body into json
    const user = {
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email,
        "phoneNumber": req.body.PhoneNumber
    }
    // run query
    const Q1 = 'INSERT INTO users SET ?';
    sql.query(Q1, user, (err, mysqlres) =>{
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message:"error in signUp" + err});
            return;
        }
        console.log("new user created");
        res.send({message: "you just signed up successfuly!"});
        return;
    })
};


const insertNewRequest = (req, res) =>{
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    const request = {
        "firstname": req.body.firstName,
        "lastname": req.body.lastName,
        "email" : req.body.email,
        "phoneNumber" :req.body.phoneNumber,
        "dueDate" : req.body.dueDate,
        "details" :req.body.details
    }
    const Q = "INSERT INTO requests SET ?";
    sql.query(Q, request, (err, mysqlres) =>{
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message:"error in creating request" + err});
            return;
        }
        console.log("new request created");
        res.send({message: "תגובתך נרשמה במערכת"});
        return;
    })
};

const insertNewContactReq = (req,res) =>{
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    const contactRequest = {
        "fullName": req.body.fullName,
        "email": req.body.email,
        "message" : req.body.message
    } 
    const Q = "INSERT INTO contacts SET ?"
    sql.query(Q, contactRequest,(err, mysqlres) =>{
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message:"error in creating  contact request" + err});
            return;
        }
        console.log("new contact request created");
        res.send({message: "תגובתך נרשמה במערכת"});
        return;
    })
};


// const findUser = (req,res)=>{
//     // validate body exists
//     if (!req.body) {
//         res.status(400).send({message: "please fill user name to search"});
//         return;    }
//     // pull data from body
//     const user = req.body.SearchName;

//     // run query
//     const Q3 = "SELECT * FROM customers where name like ?";
//     sql.query(Q3, user + "%", (err, mysqlres)=>{
//         if (err) {
//             console.log("error: error: ", err);
//             res.status(400).send({message:"could not search customer"});
//             return;
//         }
//         console.log("found user: ", mysqlres);
//         res.send(mysqlres);
//         return;
//     })
// }

module.exports = {
    // initDB,
    login,
    createTables,
    insertTables,
    showContacts,
    showRequests,
    showTranslators,
    showUsers,
    dropContacts,
    dropRequests,
    dropUsers,
    dropTranslators,
    insertNewContactReq,
    insertNewRequest,
    insertNewUser
};