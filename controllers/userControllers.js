const { request, response } = require("express");
const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");

const getUser = async (req = request, res = response) => {
  const { limit = 10, skip = 0, userID } = req.query;

  if (isNaN(Number(limit))  ||isNaN( Number(skip)) ) {
    return res.status(404).json({
      msg: `Los valores de limit y skip deben ser number `,
    });
  }

  if (userID) {
    const user = await User.findOne({ _id: userID }).select("-password");
    return res.json({
      user,
    });
  }

  const users = await User.find({ activo: true })
    .limit(Number(limit))
    .skip(Number(skip));
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
  const { nombre, img, rol } = req.body;
  let { password } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(userID, {
    nombre,
    password,
    img,
    rol,
  }).select("-password");

  res.status(200).json({
    msg: "put API -Controller",
    user,
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
