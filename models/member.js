const mongoose=require('mongoose');

const schema=mongoose.Schema({
  _name:String,
  _lastName:String,
  _phone:String,
  _adress:{
    street:String,
    number:String,
    zip:Number,
    state:String
  }
});

class Member{
  constructor(name,lastName,phone,adress){
    this._name=name;
    this._lastName=lastName;
    this._phone=phone;
    this._adress=adress;
  }

  get name() {
    return this._name;
  }

  set name(v) {
    this._name=v;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(v) {
    this._lastName=v;
  }
  get phone() {
    return this._phone;
  }

  set phone(v) {
    this._phone=v;
  }
  get adress() {
    return this._adress;
  }

  set adress(v) {
    this._adress=v;
  }
}

schema.loadClass(Member);
module.exports= mongoose.model('Member',schema);
