const router = require("express").Router();
const { authController } = require("../controllers");
const tokenHandler = require('../handlers/tokenHandler');

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/update-profile", authController.updateProfile);

router.post("/check-token", tokenHandler.verifyAdminToken, (req, res) => {
  res.status(200).json("Authorized");
});

module.exports = router;