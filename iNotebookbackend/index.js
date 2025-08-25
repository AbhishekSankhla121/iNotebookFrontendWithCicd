require('dotenv').config();
const express = require('express');
const cors = require('cors');
const os = require("os")
const app = express();
const connect_to_mongo = require('./Database/connection');
connect_to_mongo();
const port = process.env.PORT;


app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "it works", hostname: os.hostname() })
})

app.use("/user", require("./Routes/user"));
app.use("/notes", require('./Routes/notes'));
app.use("/image", express.static('./temp'))

app.listen(port, () => {
    console.log(`listen porss xsssssssasssdxs dd: http://localhosts:${port}`)
}) 
