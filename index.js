const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes/index')

const port = 3100;
mongoose
    .connect(
        `mongodb+srv://leminhduc5732:Minhduc1410@cluster0.ofdgv.mongodb.net/testJWT?retryWrites=true&w=majority&appName=Cluster0`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connected!!!"))
    .catch((err) => console.error(err));   

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
router(app);
app.listen(port, ()=>{
    console.log('App is listening on port '+ port);
});