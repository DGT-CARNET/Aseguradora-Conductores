var express = require('express');
var bodyParser =require('body-parser');

var port = 3000;
var BASE_API_PATH= "/insurance_carrier/drivers";

//Lista de conductores
var drivers= [
    {"name":"Peter","phone":"666444222","age":"32","DNI":"49112233Q","vehicle_1":"Kawasaki Z650"},
    {"name":"David","phone":"666444333","age":"22","DNI":"49001133F","vehicle_1":"Seat Panda"}
];



console.log("Starting API server...");

var app = express();
app.use(bodyParser.json());

//Pagina principal
app.get("/" , (req,res) =>{
    res.send("HELLO");
});

//Lista de conductores
app.get(BASE_API_PATH + "/drivers_list" , (req,res) =>{
    console.log(Date() + "- GET /drivers_list");
    //LIMITAR DATOS MOSTRADOS DE CADA CONDUCTOR 
    res.send(drivers);
});

//Añadir un conductor
app.post(BASE_API_PATH + "/drivers_list" , (req,res) =>{
    console.log(Date() + "- POST /drivers_list");
    //FALTA VALIDACIÓN DEL OBJETO
    var newDriver=req.body;
    drivers.push(newDriver);
    res.sendStatus(201);
});

//Detalles de un conductor

//Borrar un conductor





app.listen(port);

console.log("Server ready.");