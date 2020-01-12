const mongoose = require('mongoose');
 //{"name":"Peter", "surname":"Poter", "age":"32","DNI":"49112233Q","vehicleType_1":"Moto", "valido":"true"},
const carnetSchema = new mongoose.Schema({
    name:String,
    surname:String,
    age:Number,
    DNI:String,
    vehicleType:String,
    valid:Boolean
});


const Carnets = mongoose.model('Carnet', carnetSchema);

module.exports = Carnets;
