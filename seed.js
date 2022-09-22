const { db, Bookmarker, Category } = require('./db/server');

const seedDB = async () => {
    // below force: true wipes the module each time
    // the function seedDB is called
    // giving us a fresh start
    
    await db.sync({
        force: true
    })

    const coding = await Category.create({
        name: "Coding"
    })

    const search = await Category.create({
        name: "Search"
    })

    const jobs = await Category.create({
        name: "Jobs"
    })

    // no need to make up variables for below because we are not planning to
    // resue any of them. unlike Category.
    // (used below as categoryID)

    await Bookmarker.create({
        name: "Google",
        url: "https://www.google.com/",
        categoryId: search.id
    })
    
    await Bookmarker.create({
        name: "Stack Overflow",
        url: "https://stackoverflow.com/",
        categoryId: coding.id
    })

    await Bookmarker.create({
        name: "Bing",
        url: "https://www.bing.com/",
        categoryId: search.id
    })

    await Bookmarker.create({
        name: "LinkedIn",
        url: "https://www.linkedin.com/",
        categoryId: jobs.id
    })

    await Bookmarker.create({
        name: "Indeed",
        url: "https://www.indeed.com/",
        categoryId: jobs.id
    })

    await Bookmarker.create({
        name: "MDN",
        url: "https://developer.mozilla.org/en-US/",
        categoryId: coding.id
    })
}

seedDB();

module.exports = { seedDB }