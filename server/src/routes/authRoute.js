const router = require("express").Router();
const { authController } = require("../controllers");
const tokenHandler = require("../handlers/tokenHandler");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post(
  "/update-profile",
  tokenHandler.verifyToken,
  authController.updateProfile
);
router.get("/user-info", tokenHandler.verifyToken, authController.userInfo);

router.post("/check-token", tokenHandler.verifyToken, (req, res) => {
  res.status(200).json("Authorized");
});

module.exports = router;
