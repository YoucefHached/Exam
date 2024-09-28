const check = require("express-validator");

const validationRule = [
  check("email").isEmail().withMessage("email non valide"),
  check("password").isLength({ min: 8 }).withMessage("Mot de passe trop court"),
];

Module.exports = { validationRule };
