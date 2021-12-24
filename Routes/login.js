const express = require("express");
const router = express.Router({ mergeParams: true });
const cognitoUserService = require("../Services/cognito-login");
const util = require("../Utilities/util");

/* Registracion */
router.post("/signup", (req, res) => {
  cognitoUserService.signup(req.body, (data) => {
    res.send(data);
  });
});

/* Verificacion */
router.post("/verify-user", (req, res) => {
  cognitoUserService.verifyUser(req.body, (data) => {
    res.send(data);
  });
});

/* Login */
router.post("/login", (req, res) => {
  cognitoUserService.login(req.body, (data) => {
    res.send(data);
  });
});

/* Cambio password*/
router.put("/change-password", (req, res) => {
  cognitoUserService.changePassword(req.body, (data) => {
    res.send(data);
  });
});

/* Olvido password */
router.post("/forgot-password", (req, res) => {
  cognitoUserService.forgotPassword(req.body, (data) => {
    res.send(data);
  });
});

/* reset password */
router.put("/reset-password", (req, res) => {
  cognitoUserService.resetPassword(req.body, (data) => {
    res.send(data);
  });
});

module.exports = router;
