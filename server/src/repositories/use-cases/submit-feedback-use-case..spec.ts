import { SubmitFeedbacksUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();
const submitFeedback = new SubmitFeedbacksUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Enviar o feedback", () => {
  it("Deve ser possível enviar um feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Conserta isso ai",
        screenshot: "data:image/png;base64,teste.png",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("Não deve ser possível enviar um feedback sem tipo", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "Conserta isso ai",
        screenshot: "data:image/png;base64,teste.png",
      })
    ).rejects.toThrow();
  });

  it("Não deve ser possível enviar um feedback sem comentário", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,teste.png",
      })
    ).rejects.toThrow();
  });

  it("Não deve ser possível enviar um feedback com captura de tela inválida", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Conserta isso ai",
        screenshot: "teste.png",
      })
    ).rejects.toThrow();
  });
});
