const { Schema, model } = require("mongoose");


const userSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio "],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La password es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["Admin_Rol", "User_Rol"],
  },
  activo: { 
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

module.exports= model('User',userSchema)
