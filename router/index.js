const express = require("express");
const router = express.Router();
const { db, Bookmarker, Category } = require("./db/server");


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
        <link rel="stylesheet" href="style.css">
        </head>
        <body>
        ${contentBM
          .map(
            (bm) => `
        <div class="main">
            <p>
            <a href="${bm.url}">${bm.name} - ${bm.category.name}</a>
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


router.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(404).send("Something went wrong");
});

module.exports = router

// app.get('/bookmarker/:name', async (req,res,next)=>{
// // below variable contentBM calls for an instance where the name matches
// // the name requested by our client

// try{
//     const bmName = req.params.name;
//     const contentBM = await Bookmarker.findAll({
//         where: {
//           name : bmName
//       },
//     });
//     res.send(`
//         <!DOCTYPE html>
//         <html lang="en">
//             <head>
//         <link rel="stylesheet" href="style.css">
//         </head>
//         <body>
//           <div class="main">
//           <p>
//           <a href="${contentBM[0].url}">Click to Visit</a>
//           </p>
//           </div>
//         </body>
//         </html>
//         `);
//     } catch(error){
//         next(error);
//     }
// })