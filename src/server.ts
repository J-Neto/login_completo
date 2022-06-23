// // Dependencies
// import express from "express";
// import { router } from "./routes";
// import { Auth } from "./middlewares/auth";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// // App Express
// const app = express();

// // Allowing JSON
// app.use(express.json());

// // Using middleware
// app.use(Auth);

// // Using routes
// app.use(router);

// // Running server
// app.listen(3333, () => {
//   console.log("Link Start! \u{1F60E} \u{1F44D}")
// })

async function main() {

  const post = await prisma.task.create({
    data: {
      title: "Tarefa 1",
      completed: true,
      project: {
        connect: {
          id: "62b4c5d583240cb244f34730"
        }
      }          
    }
  })

  console.log(post)
}

main()