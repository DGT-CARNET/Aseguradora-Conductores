var express = require('express');
var bodyParser =require('body-parser');
const Carnet = require('./carnets.js');
const passport = require('passport');
var request = require('request');
require('./passport.js');

var port = 3000;
var BASE_API_PATH= "/api/v1";

var app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

//Pagina principal
app.get("/" ,
    passport.authenticate('localapikey', {session:false}),
    (req, res) => {
    res.send("<html><body><h1>CARNETS API</h1></body></html>");
});

//Listado de carnets
app.get(BASE_API_PATH+"/carnets", 
    passport.authenticate('localapikey', {session:false}),
    (req, res) => {
    console.log(Date() + "- GET /carnets_list");

    Carnet.find({}, (err, carnets) => {
        if(err){
            console.log(Date()+"-"+err);
            res.sendStatus(500);
        }else{
            res.send(carnets.map((carnet) => {
                return carnet;
            }));
        }
    });
});

//Lista un carnet
app.get(BASE_API_PATH + "/carnets/:DNI",
    passport.authenticate('localapikey', {session:false}),
    (req, res) => {
    console.log(Date() + "- GET /list_one");

    Carnet.find({DNI: req.params.DNI}, (err, carnets) => {
        if(err){
            console.log(Date()+"-"+err);
            res.sendStatus(500);
        }else{
            res.sendStatus(200);
            res.send(carnets)
        }
    });
});

//Añadir un carnet
app.post(BASE_API_PATH+"/carnets", 
    passport.authenticate('localapikey', {session:false}),
    (req, res) => {
    console.log(Date() + "- POST /new_carnet");
    var carnet = req.body;
    //TODO: Comprobar que el DNI es valido y que no existe ya en BD
    if(carnet.DNI==""){
        res.sendStatus(403);
       }
    else{
        Carnet.findOne({DNI:carnet.DNI}).then(function(carnet_in_BD){
            if(!carnet_in_BD){
                 Carnet.create(carnet, (err) => {
                     if(err){
                         console.log(Date() + " - " + err);
                         res.sendStatus(500);
                     } else {
                         res.sendStatus(201);
                     }
                 });
             }
             else{
                console.log("El DNI ya existe");
                 res.sendStatus(403);
             }
         });
       }  
});

//Retirar un carnet
app.put(BASE_API_PATH + "/carnets/retire/:DNI", 
    passport.authenticate('localapikey', {session:false}),
    (req,res)=>{
    //Añadir control de errores
    console.log(Date() + "- PUT /retire_carnet");
    Carnet.findOneAndUpdate({DNI: req.params.DNI},{ valid: "false"},{new: true}).then(function(carnet){
        res.send(carnet)
    });
    res.sendStatus(200);
});

//Cambiar validez de un carnet
app.put(BASE_API_PATH + "/carnets/revalidate/:DNI", 
    passport.authenticate('localapikey', {session:false}),
    (req,res)=>{
    //Añadir control de errores
    var dni = req.params.DNI;
    var nPuntosRecupera=2;
    console.log(Date() + "- PUT /revalidate_carnet");
    Carnet.findOneAndUpdate({DNI: dni},{ valid: "true"},{new: true}).then(function(carnet){
        const options = {
            url: 'https://api-puntos-dgt.herokuapp.com/api/v1/puntos/'+dni+'/recupera?npuntos='+nPuntosRecupera,
            headers: {
              'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
              'Content-Type':'application/json'
            }
          };
        request.post(options, function (error, response) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);       
        });
        res.send(carnet)
    });
        res.sendStatus(200);
});

app.put(BASE_API_PATH + "/carnets/edit/:DNI", 
    passport.authenticate('localapikey', {session:false}),
    (req, res) => {
    var DNI = req.params.DNI;
    var updatedCarnet = req.body;
    console.log(Date()+" - PUT edit/"+DNI);
 
    if(DNI != updatedCarnet.DNI){
        console.log("El carnet a actualizar no existe");
        res.sendStatus(409);
        return;
    }
 
    Carnet.update({"DNI": DNI},updatedCarnet, (err,updateResult)=>{
        if(err){
            console.error("Error accediendo a la BD");
            res.sendStatus(500);
        }else{
            if(updateResult.n == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }
    });
});

//Borrar un carnet
app.delete(BASE_API_PATH + "/carnets/remove/:DNI", 
    passport.authenticate('localapikey', {session:false}),
    (req,res)=>{
    //Añadir control de errores
    //Comprobar si existe el carnet en BD
    console.log(Date() + "- DELETE /remove_carnet");
    var dni = req.params.DNI;    
    Carnet.findOneAndRemove({DNI : dni}).then(function(carnet,err){
        if(err){
            console.log(err);
            res.sendStatus(409)
        }
        else{
            // request.delete("https://apimultas.herokuapp.com/api/v1/multas/deleteAll/"+dni+"/?apikey=1b72fe87-acce-4e61-8f93-e8e83bc2ebd5", function (error, response) {
            //     console.log('error:', error);
            //     console.log('statusCode:', response && response.statusCode);
            // });

            // const options = {
            //     url: 'https://api-puntos-dgt.herokuapp.com/api/v1/puntos/'+dni,
            //     headers: {
            //       'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih'
            //     }
            //   };
            // request.delete(options, function (error, response) {
            //     console.log('error:', error);
            //     console.log('statusCode:', response && response.statusCode);
            // });
            res.sendStatus(200)
        }
    });

   

    // const request= new Request("https://apimultas.herokuapp.com/api/v1/multas/deleteAll/"+req.params.DNI+"/?apikey=1b72fe87-acce-4e61-8f93-e8e83bc2ebd5",{
    //     method:'DELETE',
    //     headers:{'Content-Type':'text/plain; charset=utf-8'}
    //     });

    // return fetch(request).then(response=>{
    //     return response.json();          
    // });

});

module.exports = app;
