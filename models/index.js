'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
// var basename  = path.basename(__filename);
// var env       = process.env.NODE_ENV || 'development';
// var config    = require(__dirname + '/../config/config.json')[env];
// var db        = {};

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
//   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     var model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// var sequelize = new Sequelize({
//     username: 'martinpham',
//     password: 'NYCDA',
//     dialect: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     database: 'newbull'
// });

if (process.env.DATABASE_URL) {
  var sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  var sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
  });
}

var Messages = sequelize.define('messages',{
    
    title: { 
        type: Sequelize.STRING,
        allowNull: false
    },
    body: { 
        type: Sequelize.STRING,
        allowNull: false
    },
    created: Sequelize.DATE
});

Messages.sync()


module.exports = Messages;
