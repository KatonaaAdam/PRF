const mongoose = require('mongoose');

var aruSchema= new mongoose.Schema({
    id:{type: String,unique:true, required:true,lowercase:true},
    value:{type: String, required:true,}
}, {collection:'aru'});

mongoose.model('aru',aruSchema);