const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const getUsers = async (req, res) => {
  const users = await User.find({});
  if (!users || users.length < 1) {
    return res.status(400).json({ message: "No users found" });
  }
  return res.status(200).json({ users, total: users.length });
};
const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide all information" });
  }
  const dupUser = await User.findOne({ email });
  if (dupUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  if (!salt) {
    return res.status(500).json({ message: "Error while salting password" });
  }
  const hashedPassword = await bcrypt.hash(password, salt);
  if (!hashedPassword) {
    return res.status(500).json({ message: "Error while hashing password" });
  }
  const newUser = await User.create({ name, email, password: hashedPassword });
  return res
    .status(200)
    .json({ message: "User Created Successfully", status: 200, user: newUser });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide all information" });
  }
  const userExist = await User.findOne({ email });
  if (!userExist) {
    return res.status(400).json({ message: "No user with this email found" });
  }
  const validPassword = await bcrypt.compare(password, userExist.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  const userInfo = {
    userId: userExist._id,
    name: userExist.name,
    email,
  };
  const accessToken = jwt.sign({ userInfo }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  return res.status(200).json({
    message: "User logged in Successfully",
    user: userExist,
    accessToken,
  });
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found, send error message
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Send the token to the user's email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "useyourownemail@gmail.com",
        pass: "passwordfortheemail",
      },
    });

    // Email configuration
    const mailOptions = {
      from: "aasaddd@gmail.com",
      to: email,
      subject: "Reset Password",
      html: `<h1>Reset Your Password</h1>
    <p>Click on the following link to reset your password:</p>
    <a href="http://localhost:5173/resetPassword/">http://localhost:5173/resetPassword/</a>
    <p>The link will expire in 10 minutes.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).json({ message: "Email sent" });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide all information" });
  }
  const userExist = await User.findOne({ email });
  if (!userExist) {
    return res.status(400).json({ message: "No user with this email found" });
  }
  const salt = await bcrypt.genSalt(10);
  if (!salt) {
    return res.status(500).json({ message: "Error while salting password" });
  }
  const hashedPassword = await bcrypt.hash(password, salt);
  if (!hashedPassword) {
    return res.status(500).json({ message: "Error while hashing password" });
  }
  userExist.password = hashedPassword;
  await userExist.save();
  console.log(userExist);
  return res.status(200).json({ message: "Password Changed Successfully" });
};

const changePassword = async (req, res) => {
  const { email, password, newPassword } = req.body;
  if (!email || !password || !newPassword) {
    return res.status(400).json({ message: "Please provide all information" });
  }
  const userExist = await User.findOne({ email });
  if (!userExist) {
    return res.status(400).json({ message: "No user with this email found" });
  }
  const validPassword = await bcrypt.compare(password, userExist.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  const salt = await bcrypt.genSalt(10);
  if (!salt) {
    return res.status(500).json({ message: "Error while salting password" });
  }
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  if (!hashedPassword) {
    return res.status(500).json({ message: "Error while hashing password" });
  }
  userExist.password = hashedPassword;
  await userExist.save();
  return res.status(200).json({ message: "Password Reset Successfully" });
};
module.exports = {
  createNewUser,
  loginUser,
  getUsers,
  forgetPassword,
  changePassword,
  resetPassword,
};
