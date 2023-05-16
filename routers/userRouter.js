const { Router } = require("express");
const {
  getUser,
  postUser,
  putUser,
  deletUser,
  pathcUser,
} = require("../controllers/userControllers");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar_camposMiddleware");

//Rutas
const router = Router();

router.get("/", getUser);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo no es valido").isEmail(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    check("rol", "El rol no es valido").isIn(["Admin_Rol", "User_Rol"]),
    validarCampos,
  ],
  postUser
);

router.put("/:userID", putUser);

router.delete("/", deletUser);

router.patch("/", pathcUser);

module.exports = router;
