const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req,res)=>{
  try{
    const {name,email,password,role} = req.body;
    if(!name||!email||!password||!role) return res.status(400).json({msg:'Missing fields'});
    let user = await User.findOne({email});
    if(user) return res.status(400).json({msg:'User exists'});
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    user = await User.create({name,email,password:hash,role});
    res.status(201).json({msg:'User created'});
  }catch(err){ console.error(err); res.status(500).json({msg:'Server error'}); }
};

exports.login = async (req,res)=>{
  try{
    const {email,password,role} = req.body;
    if(!email||!password||!role) return res.status(400).json({msg:'Missing fields'});
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({msg:'Invalid credentials'});
    if(user.role !== role) return res.status(403).json({msg:'Incorrect role selected'});
    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(400).json({msg:'Invalid credentials'});
    const token = jwt.sign({id:user._id,role:user.role}, process.env.JWT_SECRET || 'secret', {expiresIn:'7d'});
    res.json({token, user:{name:user.name,email:user.email,role:user.role}});
  }catch(err){ console.error(err); res.status(500).json({msg:'Server error'}); }
};
