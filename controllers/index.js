const express = require('express');
const bcrypt=require('bcrypt');
const User=require('../models/user');
function home (req, res, next) {
  res.render('index', { title: 'Express' });
}
function login (req, res, next) {
  let email=req.body.email;
  let password=req.body.password;
  User.findOne({"_email":email}).select('_password _salt').then((user)=>{
    if(user){
      bcrypt.hash(password, user.salt, (err, hash)=>{
    if(err){
      //login no ok
      res.status(403).json({
        message:"Usuario y/o contraseña no son correctos"
      });
    }
    if(hash == user.password){
          //login OK
          res.status(200).json({
            message:"Login correcto."
          });
        }else{
          res.status(403).json({
            message:"Usuario y/o contraseña no son correctos"
          });
        }
      });
    }else{
      //login not ok
      res.status(403).json({
        message:"Usuario y/o contraseña no son correctos"
      });
    }
  }).catch((err)=>{
    //login no ok
    res.status(403).json({
      message:"Usuario y/o contraseña no son correctos"
    });
  });
}

module.exports={
  home,login
}
