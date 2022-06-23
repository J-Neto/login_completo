import { Router } from "express";
import { AuthenticateController } from "./controllers/AuthenticateController";
import { ForgotPasswordController } from "./controllers/ForgotPasswordController";
import { ProjectController } from "./controllers/ProjectController";
import { CreateProjectController } from "./controllers/projects/CreateProjectController";
import { RegisterController } from "./controllers/RegisterController";
import { ResetPasswordController } from "./controllers/ResetPasswordController";

export const router = Router();

router
  .route("/")
  .get();

router
  .route("/register")
  .post(new RegisterController().handle)

router
  .route("/authenticate")
  .post(new AuthenticateController().handle)

router
  .route("/projects")
  .get(new ProjectController().handle)

router
  .route("/forgot_password")
  .post(new ForgotPasswordController().handle)

router
  .route("/reset_password")
  .post(new ResetPasswordController().handle)

router
  .route("/projects")
  .post(new CreateProjectController().handle)