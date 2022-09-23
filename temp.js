const volleyball = require("volleyball");
const express = require("express");
const path = require("path");
const app = express();
app.use(volleyball);
const PORT = 1337;
app.use(express.urlencoded());

app.post("/bookmarker",async (req,res,next)=>{
    try{
        const body = await req.body;
    res.send(body);

    }catch(error){next(error)}
})

app.listen(PORT, () => {
  console.log("Server 1337 is up for testing");
});
