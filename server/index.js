const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const userModel = require("./models/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials: true,
}));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log("Failed to connect to MongoDB", err));

app.listen(process.env.PORT, () => {
  console.log(`The server is running on ${process.env.PORT}`);
});

app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl:process.env.MONGO_URL
  }),
  cookie:{maxAge: 24 * 60 * 60 *1000}
}))

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const existingUser = await userModel.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        req.session.user =  {id:user._id, name: user.name, email:user.email}
        res.json("Success!");
      } else {
        res.status(401).json("Wrong Password.");
      }
    } else {
      res.status(401).json("User does not exist");
    }
  } catch (error) {
    res.status(500).json({error:error.message});
  }

});

app.get('/user', (req, res)=>{
  if(req.session.user){
    res.json({user: req.session.user})
  }else{
    res.status(401).json("Not authenticated!");
  }
});

app.post('/logout', (req, res)=>{
  if(req.session){
    req.session.destroy(err=>{
      if(err){
        res.status(500).json({error: "failed to logout"})
      }else{
        res.status(200).json("Logout successful!")
      }
    })
  }else{
    res.status(400).json({error:"No session found"});
  }
})