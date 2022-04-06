const express = require('express');
const bcrypt = require('bcrypt');
const async = require('async');
const User = require('../models/user');


function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    User.paginate({}, {page:page, limit:3}).then(objs => res.status(200).json ({
        message: 'Lista de usuarios del sistema',
        obj: objs
    })).catch(ex => res.status(500).json({
        message: 'No se consultar la informacion de los usuarios...',
        obj: ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    User.findOne({"_id":id}).then(obj => res.status(200).json({
        message: `Usuario almacenado con ID ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message: `No se pudo localizar al usuario con ID ${id}`,
        obj: ex
    }));
}

function create(req, res, next){
    let name = req.body.name;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;


    async.parallel({
        salt: (callback) => {
            bcrypt.genSalt(10, callback);
        }
    }, (err, result) => {
        bcrypt.hash(password, result.salt, (err, hash) => {

            let user = new User({
                name: name,
                lastName: lastName,
                email: email,
                password: hash,
                salt: result.salt
            });

            user.save().then(obj => res.status(200).json({
                message: 'Usuario creado correctamente',
                obj: obj
            })).catch(ex => res.status(500).json({
                message: 'No se pudo almacenar el usuario',
                obj: ex
            }));
        })
    });

}





function replace(req,res,next) {
  const id=req.params.id;
  let name=req.body.name ? req.body.name : "";
  let lastName=req.body.lastName ? req.body.lastName : "";
  let email = req.body.email;
  let password = req.body.password;

  let user= new Object({
    _name:name,
    _lastName:lastName,
    _password:password,
    _email:email
  });
  User.findOneAndUpdate({"_id":id},actor).then(obj=>res.status(200).json({
    message:"Usuario remplazado correctamente.",
    obj:obj
  })).catch(ex=>res.status(500).json({
    message:"No se pudo reemplazar el usuario.",
    obj:ex
  }));

}

function edit(req,res,next) {
  const id=req.params.id;
  const name=req.body.name;
  const lastName=req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;
  
  let user=new Object();

  if(name){
    actor._name=name;
  }
  if(lastName){
    actor._lastName=lastName;
  }

  User.findOneAndUpdate({"_id":id},actor).then(obj=>res.status(200).json({
    message:"Usuario actualizado correctamente",
    obj:obj
  })).catch(ex=>res.status(500).json({
    message:"El usuario no se pudo actualizar.",
    obj:ex
  }));
}

function destroy(req,res,next) {
  const id=req.params.id;
  User.remove({"_id":id}).then(obj=>res.status(200).json({
    message:"Usuario eliminado correctamente",
    obj:obj
  })).catch(ex=>res.status(500).json({
    message:"El usuario no se pudo eliminar",
    obj:ex
  }));
}

module.exports={
  list,index,create,replace,edit,destroy
};
