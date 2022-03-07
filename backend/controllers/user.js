import User from "../models/user.js";
import nodemailer from "nodemailer";
import bcrypt from "../lib/bcrypt.js";
import jwt from "../lib/jwt.js";
// import userService from "../services/user.js";

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  let pass = await bcrypt.hassGenerate(req.body.password);

  const schema = new User({
    name: req.body.name,
    email: req.body.email,
    password: pass,
    dbStatus: true,
  });

  const result = await schema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register user" });

  const token = await jwt.generateToken(result);

  return !token
    ? res.status(500).send({ message: "Failed to register user" })
    : res.status(200).send({ token });
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const userLogin = await User.findOne({ email: req.body.email });
  if (!userLogin)
    return res.status(400).send({ message: "Wrong email or password" });

  if (!userLogin.dbStatus)
    return res.status(400).send({ message: "Wrong email or password" });

  let pass = await bcrypt.hassCompare(req.body.password, userLogin.password);

  if (!pass)
    return res.status(400).send({ message: "Wrong email or password" });

  const token = await jwt.generateToken(userLogin);
  return !token
    ? res.status(500).send({ message: "Login error" })
    : res.status(200).send({ token });
};

const updatePass = (req, res) => {
  if (!req.body.email)
    return res.status(400).send({ message: "Incomplete data" });

  const trasporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.pass,
    },
  });

  const subject = "Recuperar contraseña";
  const text =
    "Ingrese al siguinete enlace para recuperar contraseña\n http://localhost:4200/updatePass";

  let mailOption = {
    to: req.body.email,
    subject: subject,
    text: text,
  };

  trasporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ message: "error email or password" });
    } else {
      return res.status(200).send({ message: "email enviado" });
    }
  });
};

const updateUser = async (req, res) => {
  console.log(req.user);
  if (!req.body.password || !req.body.email)
    return res.status(400).send({ message: "Incomplete data" });

  let pass = await bcrypt.hassGenerate(req.body.password);

  //¿Qué sucede con el rol?
  const userUpdated = await User.findOneAndUpdate(
    { email: req.body.email },
    { password: pass }
  );

  return !userUpdated
    ? res.status(400).send({ message: "Error editing user" })
    : res.status(200).send({ message: "User updated" });
};

export default { registerUser, login, updatePass, updateUser };
