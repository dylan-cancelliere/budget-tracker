const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 5000;

const db = {};

app.use(express.json());

app.use(cors());

app.put("/statements/:user/:data", (req, res) => {
    db[req.params.user] = req.params.data;
    res.sendStatus(200);
});

// app.put("/pantry/:user/:pantry", (req, res) => {
//     let data = req.params.pantry;
//     data = data.replace(/\s/g, "").split(",");
//     pantry[req.params.user] = data;
//     res.sendStatus(200);
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
