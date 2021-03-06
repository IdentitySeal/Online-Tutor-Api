//
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const authRoutes = require("./routes/admin");
const userRoutes = require("./routes/tutor")
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(authRoutes);
app.use(userRoutes);

app.use((req, res) => {
    res.send("<h1>Welcome to my app</h1>");
});
mongoose
    .connect(
        "mongodb://localhost:27017/onlineDBNEW", { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(result => {
        console.log("Database connected");
        app.listen(3000);
    })
    .catch(err => console.log(err));