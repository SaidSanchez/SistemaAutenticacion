const express = require('express');
const Director = require('../models/director');


function list(req, res, next) {
    Director.find().then(objs => res.status(200).json({
        message: 'Lista de actores del sistema ',
        obj: objs
    })).catch(ex => res.status(500).json({
        message: 'No se pudo consultar la informacion',
        obj: ex
    }));
}

function index(req, res, next) {
    const id= req.params.id;
    Director.findOne({"_id":id}).then(obj => res.status(200).json({
        message: 'Actor almacenado con Id ${id]',
        oj: obj
    })).catch(ex => res.status(500).json({
        message: 'No se pudo consultar la el actor',
        obj: ex
    }));
}

function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;

    let director = new Director({
        name:name,
        lastName:lastName
    });

    director.save().then(obj => res.status(200).json({
        message: 'Usuario creado correctamente ',
        obj: obj
    })).catch(ex => res.status(500).json({
        message: 'No se pudo almacenar el usuario',
        obj: ex
    }));
}



function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name: "";
    let lastName = req.body.lastName ? req.body.lastName: "";

    let director = new Object({
        _name:name,
        _lastName:lastName
    });

    Director.findOneAndUpdate({"_id":id}, director).then(obj => res.status(200).json({
        message: 'Actor reemplazado con Id ${id]',
        oj: obj
    })).catch(ex => res.status(500).json({
        message: 'No se pudo reemplazar al el actor',
        obj: ex
    }));
}

function edit(req, res, next) {
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;

    let director = new Object();

    if(name){
        director._name = name;
    }
    if(lastName){
        director._lastName = lastName;
    }

    Director.findOneAndUpdate({"_id":id}, director).then(obj => res.status(200).json({
        message: 'Actor actualizado con Id ${id]',
        oj: obj
    })).catch(ex => res.status(500).json({
        message: 'No se pudo consultar al el actor',
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Director.remove({"_id":id}).then(obj => res.status(200).json({
        message: 'Actor eliminado',
        oj: obj
    })).catch(ex => res.status(500).json({
        message: 'No se pudo eliminar al el actor',
        obj: ex
    }));
}

module.exports = {
    list,index,create,replace,edit,destroy
}
