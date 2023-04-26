const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const cors = require ('cors');
const dbConfig = require ('./config/db.config')
const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
  };
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

const LicenseeRoute = require('./app/routes/licensee.routes');
app.use('/licensee',LicenseeRoute);
const myteamRoute = require('./app/routes/myteam.routes ');
app.use('/myteam',myteamRoute);

app.get('/', (req, res) => {
    res.json({"message": "Hello Your Server Is Running"});
});

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});