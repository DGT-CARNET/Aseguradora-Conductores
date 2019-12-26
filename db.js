const mongoose = require('mongoose');
const DB_URL = (process.env.MONGO_URL || 'mongodb+srv://Jesusmtorres97:uniUS2015@carnetapi-fy9hz.mongodb.net/test?retryWrites=true&w=majority');

const dbConnect = function() {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Error de conexión: '));
    return mongoose.connect(DB_URL, {useNewUrlParser: true});
}

module.exports = dbConnect;