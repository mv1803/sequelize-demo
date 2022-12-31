const Sequelize = require('sequelize');
var config = require('./config')

const sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
  host: config.database.host,
  dialect: config.database.dialect,
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
// eg: db.admin = require('../model/admin.model')(sequelize, Sequelize)


// Relations

// Admin
// EG
// db.admin.hasMany(db.admin_session, {foreignKey: 'admin_id'});
// db.admin_session.belongsTo(db.admin, {foreignKey: 'admin_id'});

module.exports = db;
