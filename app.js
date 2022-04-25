const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const passport = require('passport');
const localStartegy = require('passport-local').Strategy;
const expressSession = require('express-session');
const { Passport } = require('passport/lib');

const app = express();

const port = process.env.PORT || 3000;
const dbUrl = 'mongodb+srv://katona:AdidaS1999@prf.ri0dk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbUrl);

mongoose.connection.on('connected',()=>{
  console.log('db csatlakozva');
})

mongoose.connection.on('error',(err)=>{
  console.log('Hiba a db csatlakozasban',err);
})

require('./aru.model');
require('./user.model');
//asd
const userModel =mongoose.model('user');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({}));

const whiteList = ['http://localhost:4200']
//app.use(cors());
// app.use(cors({origin: function(origin,callback){
//   if(whiteList.indexOf(origin)>=0){
//     callback(null,true);
//   }else{
//     callback(new Error('CORSE error!!!!'));
//   }
// },credentials:true,methods:"GET,PUT,POST,DELETE,OPTIONS"}));


app.use(cors({
  origin: [
      "http://localhost:4200"
  ], credentials: true
}));


passport.use('local', new localStartegy(function(username,password,done){
  userModel.findOne({username: username},function(err,user){
    if(err) return done ('Hiba lekérés során!', null);
    if(!user) return done('Nincs ilyen felhasználó név!', null);
    user.comparePassword(password,function(err,isMatch){
      if(err) return done(err,false);
      if(!isMatch) return done('Hibás jelszó!!!!');
      return done(null,user);
    })
  })

}));

passport.serializeUser(function(user,done){
  if(!user) return done('Nincs megadva beléptethető felhasználó!', null);
  return done(null,user);
})

passport.deserializeUser(function(user,done){
  if(!user) return done('Nincs felhasználó, akit kiléptethetnénk!', null);
  return done(null,user);
})

app.use(expressSession({secret: 'prf2022webshopproject', resave: true}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => {
  res.send('Hello World!')
})

app.use('/',require('./routes'));

// 404-es Hibakezelő middleware 
app.use((req, res, next) => {
  console.log('--- Hibakezelő !!! ---')
  res.status(404).send('A kért erőforrás nem található!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!!!`)
})