import { Router } from "express";
import { AuthenticateController } from "./controllers/AuthenticateController";
import { ProjectController } from "./controllers/ProjectController";
import { RegisterController } from "./controllers/RegisterController";

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