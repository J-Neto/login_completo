// Dependencies
import express from "express";
import { router } from "./routes";
import { Auth } from "./middlewares/auth";

// App Express
const app = express();

// Allowing JSON
app.use(express.json());

// Using middleware
app.use(Auth);

// Using routes
app.use(router);

// Running server
app.listen(3333, () => {
  console.log("Link Start! \u{1F60E} \u{1F44D}")
})