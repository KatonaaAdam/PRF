const mongoose = require('mongoose');

var aruSchema= new mongoose.Schema({
    id:{type: String,unique:true, required:true,lowercase:true},
    name:{type: String, required:true},
    price:{type: String, required:true},
    desc:{type: String, required:true},
}, {collection:'aru'});

mongoose.model('aru',aruSchema);