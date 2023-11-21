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
      username: username,
    });
    if (!user) return res.status(400).json("Login failed. User not found.");

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
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
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
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, email, fullName } = req?.body;
    const newUser = await User.updateOne(
      { username: username },
      {
        $set: {
          email: email,
          fullName: fullName,
        },
      }
    );

    if (!newUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (newUser.modifiedCount > 0) {
      return res.status(200).json({ message: "Profile updated successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.userInfo = async (req, res) => {
  try {
    let token = req.headers.authorization;
    let _id = null;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    token = token?.replace("Bearer ", "");
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(403)
          .json({ message: "Failed to authenticate token" });
      }
      _id = decoded?.id;
    });
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    } else {
      user.password = null;
      return res.status(200).json({
        message: "Get user info successfully!",
        data: {
          user,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
