
const express = require("express");
const router = express.Router();
const { db, Bookmarker, Category } = require("../db/server");
router.use(express.urlencoded({ extended: false}));
const path = require("path");
const middleware = express.static(path.join(__dirname, "style"));
const overRide = require("method-override");

router.use(overRide("_method"));

router.get('/', (req,res,next)=>{
    res.send('This website is on!')
})

router.get('/bookmarker', async (req,res,next)=>{
  // below variable contentBM calls for all instances from modules
  const contentBM = await Bookmarker.findAll({
    include: [Category],
  });

  try {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
        <link rel="stylesheet" href="/style.css">
        </head>
        <body>
        ${contentBM
          .map(
            (bm) => `
        <div class="main">
            <p>
            <a href="${bm.url}">${bm.name} - </a>
            <a href="/category/${bm.categoryId}">${bm.category.name}</a>
            </p>
        </div>
        `
          )
          .join("")}
        
        <h3>Need to save a new website?</h3>
            <h3>Please fill out below form</h3>
          <div class="addForm">
          
          <form method = "POST" action="/bookmarker">
      
              <label for="name">Name of the Website</label><br>
              <input type="text" id="name" name="name"><br>
      
              <label for="url">URL</label><br>
              <input type="text" id="url" name="url"><br>
      
              <label for="category">Category</label><br>
              <input type="text" id="category" name="category"><br>
      
              <input type="submit" value="Add">
          </form>
          </div>

        </body>
        </html>
        `);
  } catch (error) {
    next(error);
  }
})

router.get("/category/:id", async (req, res, next) => {
  try {
    const realId = +req.params.id;
    const contentBM = await Bookmarker.findAll({
      include: [Category],
      where: {
        categoryId: realId,
      }
    });
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
        <h2>Please see below for all website</h2>
        ${contentBM
          .map(
            (bm) => `
         <div>
          <p class="cate">
            Website for ${bm.category.name}: ${bm.name} 
            </p>
          <div class="delete_button">
          <form method = "POST" action="/bookmarker/${bm.categoryId}?_method=DELETE"><input type="submit" value="delete?" id="${bm.categoryId}"></form> 
          </div>
          <br>
          </div>
            `
          )
          .join("")}
          <br>
        <div class="position">
        <a class="goback" href="/bookmarker">Go Back</a>
        </div>
        </body>
        </html>
        `);

  } catch (error) {
    next(error);
  }
});

router.post("/bookmarker", async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      where: {
        name: req.body.category,
      },
    });
    const catNum = categories[0];
    const bodName = await req.body.name;
    const capName = bodName.toUpperCase();
    const contentBM = await Bookmarker.findAll({
        where: {
          name: capName
        },
      });

    if (contentBM.length !== 0) {
      res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
        <link rel="stylesheet" href="/style.css">
        </head>
        <body>
        <h2 >Sorry! This bookmark already exists!</h2>
        <a href="/bookmarker">Go Back</a>
        </body>
        </html>`);
    } else{

      await Bookmarker.create({
        name: req.body.name,
        url: req.body.url,
        categoryId: catNum.id,
      });
      res.redirect("/bookmarker");

    }

  } catch (error) {
    next(error);
  }
});

router.delete("/bookmarker/:id", async (req,res,next)=>{
  try{
    const realId = +req.params.id;
    const tbd = await Bookmarker.findOne({
      where:{categoryId: realId}
    })
    if(tbd){
      await tbd.destroy();
    }
    
    res.send(`
    <body><h2>This page is working</h2>
    <a href="/bookmarker">Go Back</a></body>
    `);

  }catch(error){
    next(error);
  }
})

router.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(404).send("Something went wrong");
});

module.exports = router

