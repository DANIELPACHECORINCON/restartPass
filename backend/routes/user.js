import express from "express";
import user from "../controllers/user.js";
import userMidd from "../middlewares/user.js";
const router = express.Router();

router.post("/register",userMidd.existingUser, user.registerUser);
router.post("/login", user.login);
router.post("/sendEmail", userMidd.existingEmail, user.updatePass);
router.put("/updatePass",userMidd.existingEmail, user.updateUser);


export default router;