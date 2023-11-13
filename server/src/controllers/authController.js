const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.login = async (req, res) => {
  try {
    const { username, password } = req?.body;
    if (!username || !password) {
      return res.status(400).json("Please enter your username and password");
    }
    const user = await User?.findOne({
      userName: username,
    });
    if (!user) res.status(400).json("Login failed. User not found.");
    const decryptedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    if (decryptedPass !== req.body.password)
      return res.status(400).json("Login failed. Incorrect password.");
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.TOKEN_SECRET_KEY
    );

    user.password = undefined;

    return res.status(200).json({
      message: "Login successfully!",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

exports.register = async (req, res) => {
  try {
    let data = {};
    const { username, password, email, fullname, phoneNumber, address } =
      req?.body;
    if (!username || !password || !email || !fullname) {
      if (!username) {
        res.status(400).json("Registration failed. Invalid username.");
      }
      if (!password) {
        res.status(400).json("Registration failed. Invalid password.");
      }
      if (!email) {
        res.status(400).json("Registration failed. Invalid email.");
      }
      if (!fullname) {
        res.status(400).json("Registration failed. Invalid nickname.");
      }
      const user = await User?.findOne({
        username: username,
      });
    } else {
      let user = await User?.findOne({
        username: username,
      });
      if (user) {
        res.status(400).json("User already registered");
      }
      user = await User?.findOne({
        email: email,
      });
      if (user) {
        res.status(400).json("Email already registered");
      } else {
        const encryptedPass = CryptoJS.AES.encrypt(
          password,
          process.env.PASSWORD_SECRET_KEY
        );
        const newUser = await User?.create({
          username: username,
          password: encryptedPass,
          fullName: fullname,
          email: email,
        });

        const token = jwt.sign(
          {
            id: newUser._id,
          },
          process.env.TOKEN_SECRET_KEY
        );

        res.status(200).json({
          message: "Register successfully!",
          data: {
            token,
            newUser,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { email, fullname, phoneNumber, address } = req?.body;
    const newUser = await User?.updateOne({});
  } catch (error) {
    console.log(error);
  }
};
