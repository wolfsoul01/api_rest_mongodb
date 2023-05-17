const Rol = require("../models/rolModel");
const User = require("../models/userModel");

const rolValidator = async (rol = "") => {
  const rolExiste = await Rol.findOne({ rol });

  if (!rolExiste) {
    throw new Error(`El rol ${rol} no existe `);
  }
};

const emailValidator = async (email="") => {
  const existeEmail = await User.findOne({ email });

  if (existeEmail) {
    throw new Error(`El email ${email} ya existe `);
  }
};

module.exports = {
  rolValidator,
  emailValidator,
};
