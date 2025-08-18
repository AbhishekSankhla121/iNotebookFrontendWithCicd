require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connect_to_mongo = require('./Database/connection');
connect_to_mongo();
const port = process.env.PORT;


app.use(cors());

app.use(express.json());


app.use("/user", require("./Routes/user"));
app.use("/notes", require('./Routes/notes'));
app.use("/image", express.static('./temp'))

app.listen(port, () => {
    console.log(`listen porstss : http://localhosts:${port}`)
}) 
