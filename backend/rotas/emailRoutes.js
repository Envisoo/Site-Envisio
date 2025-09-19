/** @format */

import { Router } from "express";
import { enviarEmail } from "../controllers/emailController.js";

const router = Router();

router.post("/", enviarEmail);

export default router;
