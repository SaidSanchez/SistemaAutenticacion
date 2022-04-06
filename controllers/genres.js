const express = require('express');
const Genres = require('../models/genre');

function list(req, res, next) {
    Genres.find().then(objs => res.status(200).json({
        message: "Lista de generos",
        obj: objs
    })).catch(ex => res.status(500).json({
        message: "No se pudo consultar la lista",
        obj: ex
    }));
}

function index(req, res, next) {
    const id= req.params.id;
    Genres.findOne({"_id":id}).then(obj => res.status(200).json({
        message: `Genero con id ${id}.`,
        oj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo recuperar",
        obj: ex
    }));
}

function create(req, res, next) {
    const description = req.body.description;

    let genre = new Genre({
        description:description
    });

    genre.save().then(obj => res.status(200).json({
        message: "Creado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo crear",
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let description = req.body.description ? req.body.description: "";

    let genre = new Object({
        _description:description
        });

    Genres.findOneAndUpdate({"_id":id}, genre).then(obj => res.status(200).json({
        message: "Genero Remplazado correctamente",
        oj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo reemplazar",
        obj: ex
    }));
}

function edit(req, res, next) {
    const id = req.params.id;
    const description = req.body.description;

    let genre = new Object();

    if(description){
        genre._description = description;
    }

    Genres.findOneAndUpdate({"_id":id}, genre).then(obj => res.status(200).json({
        message: "Genero actualizado correctamente",
        oj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo actualizar",
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Genres.remove({"_id":id}).then(obj => res.status(200).json({
        message: "Eliminado",
        oj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo eliminar",
        obj: ex
    }));
}
module.exports = {
  list,index,create,replace,edit,destroy
};
