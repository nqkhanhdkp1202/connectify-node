const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { User } = require("../models");


exports.login = async (req, res) => {
  try {
    const { username, password } = req?.body
    if (!username || !password) {
      res.status(401).json("Please enter your username and password")
    }
    const user = await User?.findOne({
      userName: username,
    });
    if (!user) res.status(401).json("Login failed. User not found.");
    const decryptedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    if (decryptedPass !== req.body.password)
      res.status(401).json("Login failed. Incorrect password.");
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.TOKEN_SECRET_KEY
    );

    user.password = undefined;

    res.status(200).json({
      message: "Login successfully!", data: {
        token,
        user,
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.register = async (req, res) => {
  try {
    let data = {};
    const { username, password, email, fullname, phoneNumber, address } = req?.body;
    if (!username || !password || !email || !fullname) {
      if (!username) {
        res.status(401).json("Registration failed. Invalid username.")
      }
      if (!password) {
        res.status(401).json("Registration failed. Invalid password.")
      }
      if (!email) {
        res.status(401).json("Registration failed. Invalid email.")
      }
      if (!fullname) {
        res.status(401).json("Registration failed. Invalid nickname.")
      }
      const user = await User?.findOne({
        userName: username
      })
    }
    else {
      const user = await User?.findOne({
        userName: username
      })
      if (user) {
        res.status(401).json("User already registered")
      }
      else {
        const encryptedPass = CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_KEY);
        const newUser = await User?.create({
          userName: username,
          password: encryptedPass,
          phoneNumber: phoneNumber,
          fullName: fullname,
          address: address,
        })

        const token = jwt.sign(
          {
            id: newUser._id,
          },
          process.env.TOKEN_SECRET_KEY
        );

        res.status(200).json({
          message: "Register successfully!", data: {
            token,
            newUser,
          }
        });
      }
    }

  } catch (error) {
    console.log(error);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const {email, fullname, phoneNumber, address } = req?.body;
    const newUser = await User?.updateOne({

    })

  } catch (error) {
    console.log(error);
  }
};