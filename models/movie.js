const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _genre:String,
    _title:String,
    _actors:String,
});

class Movie {
    constructor(genre, title, actors, director){
        this._genre = genre;
        this._title = title;
        this._actors = actors;

    }

    get genre(){
        return this._genre;
    }

    set genre(v){
        this._genre = v;
    }

    get title(){
        return this._title;
    }

    set title(v){
        this._title = v;
    }

    get actors(){
        return this._actors;
    }

    set actors(v){
        this._actors = v;
    }

}

schema.loadClass(Movie);

module.exports = mongoose.model('Movie', schema);
