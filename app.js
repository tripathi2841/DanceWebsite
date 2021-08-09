const express = require("express");
const app = express();
const port = 80;
const bodyparser = require("body-parser");
const fs = require("fs");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ContactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const path = require("path");

app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    let parms = { }
    res.status(200).render('home.pug',parms);
})
app.get('/contact',(req,res)=>{
    let parms = { }
    res.status(200).render('contact.pug',parms);
})
const ContactSchema = new mongoose.Schema({
    name: String,
    age: String,
    weight: String,
    address: String,
    email: String,
    Contact: String
});
const Contact = mongoose.model('Contact', ContactSchema);


app.post('/contact',(req,res)=>{
    var mydata = new Contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved successfilly to database!")
    }).catch(()=>{
        res.status(400).send("Item was not saved to database!")
    })
   
})
app.listen(port,()=>{
    console.log(`The application is started sucessfully on port ${port}`);
})


