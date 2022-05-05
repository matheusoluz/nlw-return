import express from "express";
import { NodemailerAdapter } from "./adapters/nodemailer/nodemailer-adapter";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { SubmitFeedbacksUseCase } from "./repositories/use-cases/submit-feedback-use-case";
export const routes = express.Router();

routes.get("/", (req, res) => {
  return res.send("Hello Matheus");
});

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerAdapter = new NodemailerAdapter();
  const submitFeedbacksUseCase = new SubmitFeedbacksUseCase(
    prismaFeedbacksRepository,
    nodemailerAdapter
  );

  await submitFeedbacksUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});
