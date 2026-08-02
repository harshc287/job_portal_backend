const User = require("../models/User")
const bcrypt = require("bcryptjs")
const generateToken = require("../utils/generateToken")

exports.register = async(req,res)=>{

 try{

 const {name,email,password,role} = req.body


 const userExists = await User.findOne({email})

 if(userExists){
  return res.status(400).json({message:"User exists"})
 }

 const user = await User.create({
  name,
  email,
  password,
  role
 })

 res.json({
  _id:user._id,
  name:user.name,
  email:user.email,
  role:user.role,
  token:generateToken(user._id)
 })

 }catch(error){
  console.error("Register Error:", error)
  res.status(500).json({error:error.message})
 }

}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Email entered:", email);
  console.log("Password entered:", password);

  const user = await User.findOne({ email });

  console.log("User found:", !!user);

  if (user) {
    console.log("Stored hash:", user.password);

    const match = await bcrypt.compare(password, user.password);
    console.log("Password match:", match);

    if (match) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }
  }

  return res.status(401).json({ message: "Invalid credentials" });
};