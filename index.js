const express= require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/inotebook')
app.use(express.json());
const Router=require("./routes/Auth.js")
app.use("/Auth",Router)










  
  
  





  app.listen(5000)
