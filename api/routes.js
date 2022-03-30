const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const aurModel =mongoose.model('aru')

router.route('/webshop').get((req,res,next)=>{
    //adatok lekérése
    aurModel.find({}, (err,aru)=>{
        if(err) return res.status(500).send('DB hiba');
         res.status(200).send(aru);
    });
}).post((req,res,next)=>{
    //adatok beszúrása
    if(req.body.id && req.body.value){
        aurModel.findOne({id: req.body.id}, (err,aru)=>{
            if(err) return res.status(500).send('DB hiba');
            if(aru){
                return res.status(400).send('Már van ilyen id!');
            } else{
                const aru = new aurModel({id: req.body.id, value: req.body.value});
                aru.save((error)=>{
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
            aru.save((error)=>{
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
                aru.delete((error)=>{
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



