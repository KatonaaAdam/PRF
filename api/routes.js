const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const aurModel =mongoose.model('aru');
const userModel =mongoose.model('user');

router.route('/user').get((req,res,next)=>{
    //USER adatok lekérése
    userModel.find({}, (err,users)=>{
        if(err) return res.status(500).send('DB hiba');
         res.status(200).send(users);
    })
}).post((req,res,next)=>{
    //USER adatok beszúrása
    if(req.body.username && req.body.email && req.body.password){
        userModel.findOne({username: req.body.username}, (err,user)=>{
            if(err) return res.status(500).send('DB hiba');
            if(user){
                return res.status(400).send('Hiba, már van ilyen felhasználó!');
            } 
                const u = new userModel({username: req.body.username,password: req.body.password, email: req.body.email});
                console.log(req.body.username)
                console.log(req.body.password)
                u.save((error)=>{
                    if(error) return res.status(500).send('A USER mentés hibás');
                    return res.status(200).send('Siekres USER mentés')
                })
        })
    }else{
        return res.status(400).send('Hibás kérés, nincs username vagy email vagy password!!!');
    }
})




router.route('/webshop').get((req,res,next)=>{
    //adatok lekérése
    aurModel.find({}, (err,aru)=>{
        if(err) return res.status(500).send('DB hiba');
         res.status(200).send(aru);
    })
}).post((req,res,next)=>{
    //adatok beszúrása
    if(req.body.id && req.body.value){
        aurModel.findOne({id: req.body.id}, (err,aru)=>{
            if(err) return res.status(500).send('DB hiba');
            if(aru){
                return res.status(400).send('Már van ilyen id!');
            } else{
                const aru = new aurModel({id: req.body.id, value: req.body.value});
                aru.save((err)=>{
                    if(err) return res.status(500).send('A mentés hibás');
                    return res.status(200).send('Siekres aru mentés')
                })
            }
        })
    }else{
        return res.status(400).send('Nem volt id vagy value!!!');
    }
}).put((req,res,next)=>{
    //adatok frissítése
    aurModel.findOne({id: req.body.id}, (err,aru)=>{
        if(err) return res.status(500).send('DB hiba');
        if(aru){
            aru.value = req.body.value;
            aru.save((err)=>{
                if(err) return res.status(500).send('Frissítési hibás');
                return res.status(200).send('Az áru adatai sikeresen frissítve!')
            });
        } else{
            return res.status(400).send('Nincs ilyen id az adatbázisban!!!');
        }
    })
}).delete((req,res,next)=>{
    //adatok törlése
    if(req.body.id){
        aurModel.findOne({id: req.body.id}, (err,aru)=>{
            if(err) return res.status(500).send('DB hiba');
            if(aru){
                aru.delete((err)=>{
                    if(err) return res.status(500).send('A törlés hibás!!!');
                    return res.status(200).send('Siekres törlés!')
                })
            } else{
                return res.status(400).send('Nincs ilyen id az adatbázisban!!!');
            }
        })
    }else{
        return res.status(400).send('Nem volt id!!!');
    }
})



module.exports=router;



