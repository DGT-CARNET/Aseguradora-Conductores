const mongoose = require('mongoose');
 //{"name":"Peter", "surname":"Poter", "age":"32","DNI":"49112233Q","vehicleType_1":"Moto", "valido":"true"},
const carnetSchema = new mongoose.Schema({
    name:String,
    surname:String,
    age:Number,
    DNI:String,
    vehicleType_1:String,
    valido:Boolean
});

carnetSchema.methods.cleanup = function() {
    return {name: this.name, surname: this.surname,valido:this.valido, DNI:this.DNI};
}

carnetSchema.methods.comprove_DNI= function(){
    var numero, let, letra;
    var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

    dni = this.dni.toUpperCase();

    if(expresion_regular_dni.test(dni) === true){
        numero = dni.substr(0,dni.length-1);
        numero = numero.replace('X', 0);
        numero = numero.replace('Y', 1);
        numero = numero.replace('Z', 2);
        let = dni.substr(dni.length-1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero+1);
        if (letra != let) {
            //alert('Dni erroneo, la letra del NIF no se corresponde');
            return false;
        }else{
            //alert('Dni correcto');
            return true;
        }
    }else{
        //alert('Dni erroneo, formato no válido');
        return false;
    }
}

const Carnets = mongoose.model('Carnet', carnetSchema);

module.exports = Carnets;
