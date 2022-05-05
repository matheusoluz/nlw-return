import { MailAdapter } from "../../adapters/mail-adapter";
import { FeedbackRepository } from "../feedbacks-repository";

interface SubmitFeedbacksUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbacksUseCase {
  constructor(
    private feedbacksRepository: FeedbackRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbacksUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Tipo de feedback é obrigatório.");
    }

    if (!comment) {
      throw new Error("Comentário no feedback é obrigatório.");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Captura de tela no formato inválido.");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback - solid",
      body: [
        `<div>`,
        `<p>Tipo de feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`,
      ].join("\n"),
    });
  }
}
