import { Request, Response } from "express";

class ProjectController {
  async handle(req:Request, res:Response) {

    res.send({ ok: true, user: req.userId});  

  }
}

export { ProjectController };