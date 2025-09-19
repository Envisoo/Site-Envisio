/** @format */

import { Router } from "express";
import { enviarEmail } from "../controllers/emailController.js";

const router = Router();

router.post("/email", enviarEmail);

export default router;
