const { DataTypes } = require('sequelize');
const sequelize = require('../connection/db')

const Student = sequelize.define('Student', {
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
firstName: {
    type: DataTypes.STRING,
    allowNull: false
},
lastName: {
    type: DataTypes.STRING,
    allowNull: false
},
phone: {
    type: DataTypes.STRING
},
address: {
    type: DataTypes.STRING
},
classId: {
    type: DataTypes.INTEGER,

}
}, {
    tableName: 'students'
});

module.exports = Student