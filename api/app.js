const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

require('./aru.model')

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({}));
app.use(cors());

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