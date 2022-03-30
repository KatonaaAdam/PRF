const mongoose = require('mongoose');
const bcrypt =require('bcrypt');

var userSchema= new mongoose.Schema({
    username:{type: String,unique:true, required:true,lowercase:true},
    password:{type: String, required:true},
    email:{type: String, required:true},
    accessLevel:{type: String}
}, {collection:'users'});

userSchema.pre('save', function(next){
const user =this;
if(user.isModified('password')){
    user.accessLevel ='basic';
    bcrypt.genSalt(10,function(err,salt){
        if(err){
            console.log('Hiba a salt generálása során!');
            return next(err);
        }
        bcrypt.hashSync(user.password,salt,function(err,hash){
            if(err){
                console.log('Hiba a hash generálása során!');
                return next(err);
            }
            user.password=hash;
            return next();
        })
    })
}else{
    return next();
}

})

mongoose.model('user',userSchema);