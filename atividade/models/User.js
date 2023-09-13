const { DataTypes } = require('sequelize')
const db = require('../db/conn') 


//  CREATE TABLE User (
//     name VARCHAR (255) NOT NULL,
//     occupation VARCHAR (255) NOT NULL,
//     newsletter BOOL 
// );

 
const User = db.define('User',{
    name: {
        type:DataTypes.STRING,
        allowNull: false
    },                    
    occupation: {
        type: DataTypes.STRING,
        require: true
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
    }

})

module.exports = User