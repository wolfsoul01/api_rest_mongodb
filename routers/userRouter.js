const { Router } = require("express");
const { check } = require("express-validator");

const {
  getUser,
  postUser,
  putUser,
  deletUser,
  pathcUser,
} = require("../controllers/userControllers");
const { validarCampos } = require("../middleware/validar_camposMiddleware");
const { rolValidator, emailValidator, exiteIDValidator } = require("../helpers/dbValidaciones");

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
    //check("rol", "El rol no es valido").isIn(["Admin_Rol", "User_Rol"]),
    check("email").custom(emailValidator),
    check("rol").notEmpty(),
    check("rol").custom(rolValidator),
    validarCampos,
  ],
  postUser
);

router.put(
  "/:userID",
  [
    check("userID", "No es un id valido de mongo ").isMongoId(),
    check("rol").custom(rolValidator),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    check('userID').custom(exiteIDValidator),
    validarCampos,
  ],
  putUser
);

router.delete(
  "/:userID",
  [
    check("userID", "Debes proporcionar el ID").not().isEmpty(),
    check("userID", "No es un id valido de mongo ").isMongoId(),

    validarCampos,
  ],
  deletUser
);

router.patch("/", pathcUser);

module.exports = router;
