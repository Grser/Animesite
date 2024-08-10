const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Content = sequelize.define('Content', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    genre: {
        type: DataTypes.STRING
    },
    videoUrl: {
        type: DataTypes.STRING
    },
    coverImage: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true,
    tableName: 'content'
});

module.exports = Content;
