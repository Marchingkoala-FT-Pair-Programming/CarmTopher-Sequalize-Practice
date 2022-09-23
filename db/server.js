const { set } = require('express/lib/application');
const Sequelize = require('sequelize');
const db = new Sequelize("postgres://localhost/bookmarker_database")

const Bookmarker = db.define("bookmarker", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
            const uppercase = value.toUpperCase();
            this.setDataValue('name', uppercase)
        }
    },
    url:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Category = db.define("category", {
    name: {
        type: Sequelize.STRING
    }
})

Bookmarker.belongsTo(Category);
Category.hasMany(Bookmarker);



module.exports = { db, Bookmarker, Category }