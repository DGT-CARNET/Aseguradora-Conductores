//const db = require('./db.js');
var express = require('express');
var bodyParser =require('body-parser');
const Carnet = require('./carnets.js');

var port = 3000;
var BASE_API_PATH= "/traffic_management";

var app = express();
app.use(bodyParser.json());

//Pagina principal
app.get("/" , (req,res) =>{
     res.send("<html><body><h1>CARNETS API</h1></body></html>");
});

//Listado de carnets
app.get(BASE_API_PATH, (req, res) => {
    console.log(Date() + "- GET /carnets_list");

    Carnet.find({}, (err, carnets) => {
        if(err){
            console.log(Date()+"-"+err);
            res.sendStatus(500);
        }else{
            res.send(carnets.map((carnet) => {
                return carnet.cleanup();
            }));
        }
    });
});

//Añadir un carnet
app.post(BASE_API_PATH, (req, res) => {
    console.log(Date() + "- POST /new_carnet");
    var carnet = req.body;
    Carnet.create(carnet, (err) => {
        if(err){
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

//Retirar un carnet
app.put(BASE_API_PATH + "/retire/:DNI", (req,res)=>{
    //Añadir control de errores
    console.log(Date() + "- PUT /retire_carnet");
    Carnet.findOneAndUpdate({DNI: req.params.DNI},{ valido: "false"}) 
    res.sendStatus(200);
});

//Cambiar validez de un carnet

//Borrar un carnet

//Editar un carnet

module.exports = app;
