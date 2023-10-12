const router = require("express").Router();
const { authController } = require("../controllers");
const tokenHandler = require('../handlers/tokenHandler');

router.get("/", authController.helloAdmin);
router.post("/login", authController.login);

router.post("/check-token", tokenHandler.verifyAdminToken, (req, res) => {
  res.status(200).json("Authorized");
});

module.exports = router;