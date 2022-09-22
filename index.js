const express = require('express');
const path = require('path');
const app = express();
const middleware = express.static(path.join(__dirname, 'style'))
app.use(middleware)
const { db, Bookmarker, Category } = require('./db/server')
const PORT = 3000;

// const router = require('./router')
// app.use('/', router)

app.get('/', (req,res,next)=>{
    res.send('This website is on!')
})

app.get('/bookmarker', async (req,res,next)=>{
  // below variable contentBM calls for all instances from modules
  const contentBM = await Bookmarker.findAll({
    include: [Category],
  });

  try {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
        <link rel="stylesheet" href="style.css">
        </head>
        <body>
        ${contentBM
          .map(
            (bm) => `
        <div class="main">
            <p>
            <a href="/bookmarker/${bm.name}">${bm.name} - ${bm.category.name}</a>
            </p>
        </div>
        `
          )
          .join("")}
        
        </body>
        </html>
        `);
  } catch (error) {
    next(error);
  }
})

app.get('/bookmarker/:name', async (req,res,next)=>{
// below variable contentBM calls for an instance where the name matches
// the name requested by our client

try{
    const bmName = req.params.name;
    const contentBM = await Bookmarker.findAll({
        attribute:['url'],
        where: {
          name : bmName
      },
    });
// hmm.. I'm not sure why it's not receiving the correct url address
// I'm getting undefined... 
    res.send(`yay! This is a page for ${bmName}`)
    console.log(contentBM)
    } catch(error){
        next(error);
    }
})

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(404).send("Something went wrong");
});

app.listen( PORT, ()=>{
    console.log('Server is live Again!')
})