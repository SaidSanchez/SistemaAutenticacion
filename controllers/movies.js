const express = require('express');
const Movie = require('../models/movie');
const Genre=require('../models/genre');

function list(req, res, next) {
    Movie.find().populate("_genre").then(objs => res.status(200).json({
        message: "Lista de peliculas",
        obj: objs
    })).catch(ex => res.status(500).json({
        message: "No se pudo consultar la lista de peliculas",
        obj: ex
    }));
}

function index(req, res, next) {
    const id= req.params.id;
    Movie.findOne({"_id":id}).then(obj => res.status(200).json({
        message: `Pelicula con el id ${id}.`,
        oj: obj
    })).catch(ex => res.status(500).json({
        message: `No se pudo recuperar la pelicula con el id ${id}`,
        obj: ex
    }));
}

function create(req, res, next) {
    const title = req.body.title;
    const genereId=req.body.genereId;

    Genre.findOne({"_id":genereId}).then((genre)=>{
      let movie = new Movie({
          title:title,
          genre:genre
      });

      movie.save().then(obj => res.status(200).json({
          message: "Pelicula creada correctamente",
          obj: obj
      })).catch(ex => res.status(500).json({
          message: "La pelicula no se pudo crear",
          obj: ex
      }));
    }).catch(ex=>re.status(500).json({
      message:"No se encontró el genero de la pelicula a almacenar",
      obj:ex
    }));
}



function replace(req, res, next) {
    const id = req.params.id;
    let title = req.body.title ? req.body.title: "";

    let movie = new Object({
        _title:title,
    });

    Movie.findOneAndUpdate({"_id":id}, movie).then(obj => res.status(200).json({
        message: "Pelicula remplazada",
        oj: obj
    })).catch(ex => res.status(500).json({
        message:"La pelicula no se pudo reemplazar",
        obj: ex
    }));
}

function edit(req, res, next) {
    const title = req.body.title;

    let movie = new Object();

    if(tittle){
        movie._title = tittle;
    }

    Movie.findOneAndUpdate({"_id":id}, movie).then(obj => res.status(200).json({
        message: "Pelicula actualizada",
        oj: obj
    })).catch(ex => res.status(500).json({
        message: "La pelicula no se pudo actualizar",
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Movie.remove({"_id":id}).then(obj => res.status(200).json({
        message: "La pelicula ha sido eliminada",
        oj: obj
    })).catch(ex => res.status(500).json({
        message: "La pelicula no se pudo eliminar",
        obj: ex
    }));
}

module.exports = {
    list,index,create,replace,edit,destroy
};
