const { request, response } = require("express");
const User = require("../models/userModel");
const bcryptjs =require('bcryptjs');



const getUser = (req = request, res = response) => {
  const {
    nombre = "No name",
    apiKey = "null",
    page = 1,
    limit = 5,
  } = req.query;

  res.json({
    msg: "get API -Controller",
    nombre,
    apiKey,
    page,
    limit,
  });
};

const postUser = async (req = request, res = response) => {
  const { nombre, email, password,google,img="",rol} = req.body;

  
  const user = new User({
    nombre,
    email,
    password,
    google,
    img,
    rol
  });


  // Verificar si el correo existe 
  const emailExist =await User.findOne({email})
  if(emailExist){
    return res.status(400).json({
      msg:'El correo ya exite '
    });
  }


  //Encriptar password
  const salt= bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password,salt)

  //Guardar en db 
  try {
    await user.save(); 
    console.log('Usuario guardado ');
  } catch (error) {
    console.log(error);
    throw new Error('Error al guardar')
  }

  res.status(201).json({
    msg: "post API -Controller",
    user,
    Error
  });
};

const putUser = (req = request, res = response) => {
  const { userID } = req.params;
  res.status(200).json({
    msg: "put API -Controller",
    userID,
  });
};

const deletUser = (req = request, res = response) => {
  res.json({
    msg: "delete API -Controller",
  });
};

const pathcUser = (req = request, res = response) => {
  res.json({
    msg: "patch API -Controller",
  });
};

module.exports = {
  getUser,
  postUser,
  putUser,
  deletUser,
  pathcUser,
};
