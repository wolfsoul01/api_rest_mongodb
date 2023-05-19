const { request, response } = require("express");
const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");

const getUser = async (req = request, res = response) => {
  const { limit = 10, skip = 0 ,userID} = req.query;


  if(userID){

     const {nombre,rol,_id,email,} = await User.findOne({_id:userID})

     
    return res.json({
      nombre,rol,_id,email,
    })
  }

  const users = await User.find({ activo: true }).limit(limit).skip(skip);
  const total = users.length;

  res.json({
    msg: "get API -Controller",
    total,
    users,
  });
};

const postUser = async (req = request, res = response) => {
  const { nombre, email, password, google, img = "", rol } = req.body;

  const user = new User({
    nombre,
    email,
    password,
    google,
    img,
    rol,
  });

  // Verificar si el correo existe
  /*  const emailExist =await User.findOne({email})
  if(emailExist){
    return res.status(400).json({
      msg:'El correo ya exite '
    });
  } */

  //Encriptar password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  //Guardar en db
  try {
    await user.save();
    console.log("Usuario guardado ");
  } catch (error) {
    console.log(error);
    throw new Error("Error al guardar");
  }

  //Limpiando la password de la res
  const resp = user.toObject();
  delete resp.password;

  //respuesta
  res.status(201).json({
    msg: "post API -Controller",
    resp,
  });
};

const putUser = async (req = request, res = response) => {
  const { userID } = req.params;
  const { nombre, img } = req.body;
  let { password } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    password = bcryptjs.hashSync(password, salt);
  }

  await User.findByIdAndUpdate(userID, { nombre, password, img });

  res.status(200).json({
    msg: "put API -Controller",
    userID,
    password,
  });
};

const deletUser = async (req = request, res = response) => {
  const { userID } = req.params;

  await User.findByIdAndUpdate(userID, { activo: false });

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
