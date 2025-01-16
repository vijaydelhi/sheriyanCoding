const mongoose  = require('mongoose');
const db = mongoose.connect('mongodb://0.0.0.0/userDB').then(()=>{
    console.log('Database connected')
})

module.exports = db;