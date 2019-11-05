var express = require('express')
var app = express()
var cors = require('cors')

var bodyParser = require('body-parser')
var mysql = require('mysql')


app.use(express.static(__dirname + "/dist"))

app.use(bodyParser.json())

app.use(cors())


app.listen(process.env.PORT || 8080)
console.log("Server is running on 8080")

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "IAFT"
  })
  
con.on('error', function(err){
    console.log('Database Error',err)
})

con.on('connect', function(){
    console.log('Database Connected!!')
})


app.post('/userLogin', (req,res) => {
    console.log("request for login:server.js");
    let username = req.body.username;
    let password = req.body.password;
    let query = "SELECT * FROM USERS where username = '"+ username +"' and password = '"+password+"'";

    con.query(query, (err, user) => {
        if(err || !user){
            res.json({username: 'Not Found!', password: 'Not Found!'})
        }
        else{
            //session stuff....remained
            console.log(user)
            console.log("logged in candidate")
            res.json(user)
        }
    })
})

app.post('/bookFlight',(req,res) => {
    console.log("request for book flight: server.js");
    let flightid = req.body.flightid;
    let username = req.body.username;
    let emailid = req.body.emailid;
    let query = "INSERT INTO bookings (flightid, username, emailid) VALUES ('"+flightid+"', '"+username+"', '"+emailid+"');";
    con.query(query, (err, booking) => {
        if(err || !booking){
            res.json({flightid:'Not found'});
        }
        else{
            console.log(booking);
            res.json(booking);
        }
    })
})

app.post('/getFlights',(req, res) => {
    console.log("request for search flights: server.js");
    let source = req.body.source;
    let destination = req.body.destination;
    let jdate = req.body.jdate;
    let query = "SELECT * FROM flights where source = '"+source+"' and destination = '"+destination+"' and date = '"+jdate+"'";
    con.query(query, (err, flights) => {
        if(err || !flights){
            res.json({source: 'Not Found!', destination: 'Not Found!', date: 'not available'});
        }
        else{
            console.log(flights);
            res.json(flights);
        }
    });
});
