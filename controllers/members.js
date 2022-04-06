const express=require('express');
const Member=require('../models/member');
function list(req,res,next) {
  Member.find().then(objs=>res.status(200).json({
    message:"Lista de members registrados.",
    obj:objs
  })).catch(ex=>res.status(500).json({
    message:"No se pudo consultar la lista de members.",
    obj:ex
  }));
}

function index(req,res,next) {
  const id=req.params.id;
  Member.findOne({"_id":id}).then(obj=>res.status(200).json({
    message:`Member con el id ${id}.`,
    obj:obj
  })).catch(ex=>res.status(500).json({
    message:`No se pudo recuperar el member con el ${id}.`,
    obj: ex
  }));
}

function create(req,res,next) {
  const name=req.body.name;
  const lastName=req.body.lastName;
  const phone=req.body.phone;
  const adress=new Object();
  adress.street=req.body.street;
  adress.number=req.body.number;
  adress.zip=req.body.zip;
  adress.state=req.body.state;

  let actor=new Member({
    name:name,
    lastName:lastName,
    phone:phone,
    adress:adress
  });

  member.save().then(obj=>res.status(200).json({
    message:'Member creado correctamente',
    obj:obj
  }))
    .catch(ex=>res.status(500).json({
      message:'No se pudo almacenar el member',
      obj:ex
    }))
}

function replace(req,res,next) {
  const id=req.params.id;
  let name=req.body.name ? req.body.name : "";
  let lastName=req.body.lastName ? req.body.lastName : "";
  let phone=req.body.phone ? req.body.phone : "";

  let actor= new Object({
    _name:name,
    _lastName:lastName,
    _phone:phone
  });
  Member.findOneAndUpdate({"_id":id},actor).then(obj=>res.status(200).json({
    message:"Actor remplazado correctamente.",
    obj:obj
  })).catch(ex=>res.status(500).json({
    message:"No se pudo reemplazar el actor.",
    obj:ex
  }));

}

function edit(req,res,next) {
  const id=req.params.id;
  const name=req.body.name;
  const lastName=req.body.lastName;
  const phone=req.body.phone;

  let actor=new Object();

  if(name){
    member._name=name;
  }
  if(lastName){
    member._lastName=lastName;
  }
  if(phone){
    member._phone=phone;
  }


  Member.findOneAndUpdate({"_id":id},actor).then(obj=>res.status(200).json({
    message:"Member actualizado correctamente",
    obj:obj
  })).catch(ex=>res.status(500).json({
    message:"El member no se pudo actualizar.",
    obj:ex
  }));
}

function destroy(req,res,next) {
  const id=req.params.id;
  Member.remove({"_id":id}).then(obj=>res.status(200).json({
    message:"Member eliminado correctamente",
    obj:obj
  })).catch(ex=>res.status(500).json({
    message:"El member no se pudo eliminar",
    obj:ex
  }));
}

module.exports={
  list,index,create,replace,edit,destroy
};
