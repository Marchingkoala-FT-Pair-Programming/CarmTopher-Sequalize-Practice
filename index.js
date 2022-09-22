const express = require('express');
const app = express();
const { db, Bookmarker, Category } = require('./db/server')

app.get('/', (req,res,next)=>{
    res.send('This website is on!')
})

app.get('/bookmarker', async (req,res,next)=>{
    const contentBM = await Bookmarker.findAll({
        include: [
            Category
        ]
    });
    res.send(`
    <body>
        ${
           contentBM.map( bm => `
           <div>
            <h2>Bookmark name : ${bm.name}</h2>
            <p>URL: ${bm.url}</p>
            <p>Category ID: ${bm.categoryId}</p>
            <p>Category: ${bm.category.name}</p>
           </div>
           `).join("") 
        }
    </body>
    `)
})


app.listen( 3000, ()=>{
    console.log('Server is live Again!')
})