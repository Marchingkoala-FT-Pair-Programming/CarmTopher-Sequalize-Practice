const Sequelize = require('sequelize');
const db = new Sequelize("postgres://localhost/bookmarker_database")

const Bookmarker = db.define("bookmarker", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
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