const mongoose = require('mongoose');
const DB_URL = (process.env.MONGO_URL || 'mongobd://mongo/test');

const dbConnect = function() {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Error de conexión: '));
    return mongoose.connect(DB_URL, {useNewUrlParser: true});
}

module.exports = dbConnect;