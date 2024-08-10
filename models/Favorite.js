const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Content = require('./Content');

const Favorite = sequelize.define('Favorite', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    contentId: {
        type: DataTypes.INTEGER,
        references: {
            model: Content,
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false,
    tableName: 'favorites'
});

User.belongsToMany(Content, { through: Favorite, foreignKey: 'userId' });
Content.belongsToMany(User, { through: Favorite, foreignKey: 'contentId' });

module.exports = Favorite;
