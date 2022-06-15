const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const { body, validationResult } = require("express-validator");

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const { response } = require("express");

app.use(express.json());
app.use(
  session({
    secret: "HelloPeople",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize()), app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/inotebook");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

app.post(
  "/auth/createuser",
  body("username").isEmail(),

  body("password").isLength({ min: 5 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.register(
      { username: req.body.username },
      req.body.password,
      function (err, foundUser) {
        if (err) {
          res.json(err);
        } else {
          passport.authenticate(req.body.username, req.body.password)(
            response,
            req,
            function () {
              response.json("added");
            }
          );
        }
      }
    );
  }
);
app.post("/auth/login",  body("username").isEmail(),

body("password").isLength({ min: 5 }),

async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });}
    const user =  new User({
      username:req.body.username,
      password:req.body.password
  
    })
    req.login(user, function(err) {
      if (err) { return res.json("correct your login credentials"); }
      else{
        passport.authenticate("local")
        (req,res,function(){
          if(!user){
            return res.json ("you are not a user")
          }
          else{
            return res.json("loggedin")
          }
         
        })
      }

     
      })
    });
    




  
  






app.listen(5000);
