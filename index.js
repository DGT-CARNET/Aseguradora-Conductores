var express = require('express');
var bodyParser =require('body-parser');

var port = 3000;
var BASE_API_PATH= "/traffic_management/carnet";

//Lista de conductores
var drivers= [
    {"name":"Peter", "surname":"Poter", "age":"32","DNI":"49112233Q","vehicleType_1":"Moto", "válido":"true"},
    {"name":"David", "Surname":"Dear", "age":"22","DNI":"49001133F","vehicleType_1":"Car", "válido":"true"}
];



console.log("Starting API server...");

var app = express();
app.use(bodyParser.json());

//Pagina principal
app.get("/" , (req,res) =>{
    res.send("HELLO");
});

//Lista de carnets
app.get(BASE_API_PATH + "/carnets_list" , (req,res) =>{
    console.log(Date() + "- GET /carnets_list");
    //LIMITAR DATOS MOSTRADOS DE CADA CONDUCTOR 
    res.send(drivers);
});

//Carnet de 1 conductor
app.get(BASE_API_PATH + "/carnets_list?conductor:DNI" , (req,res) =>{
    console.log(Date() + "- GET /carnets_list?conductor:DNI");
    //LIMITAR DATOS MOSTRADOS DE CADA carnet 
    res.send(drivers);
});

//Añadir un carnet
app.post(BASE_API_PATH + "/nuevo" , (req,res) =>{
    console.log(Date() + "- POST /nuevo");
    //FALTA VALIDACIÓN DEL OBJETO
    var newCarnet=req.body;
    drivers.push(newCarnet);
    res.sendStatus(201);
});

//Validez de un carnet
app.put(BASE_API_PATH + "/conductor:DNI/valido" , (req,res) =>{
    console.log(Date() + "- PUT /conductor:DNI/valido");
    //Si el carnet tiene >0 puntos (consultar a la api de puntos) es valido, sino valido = false
});

//Borrar un carnet
app.delete(BASE_API_PATH + "/carnet_list/conductor:dni/delete", (req, res) =>{
    console.log(Date() + "- DELETE /carnet_list/conductor:dni/delete");
    //Si el conductor esta muerto se borra el carnet, consultar a la api de )
})





app.listen(port);

console.log("Server ready.");