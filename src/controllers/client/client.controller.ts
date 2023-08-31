import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { ClientService } from "./client.service";
import { JoiValidationPipe } from "../../app/pipe/validator.pipe";
import { contactsValidator } from "../../services/joiValidate";
import { MessageDto, QuizDto } from "./client.dto";

@Controller("api/phone-send")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post("/telegram")
  @HttpCode(204)
  @UsePipes(new JoiValidationPipe(contactsValidator))
  async sendOnTelegram(@Body() bodyMessage: MessageDto): Promise<void> {
    return this.clientService.sendSmsTelegram(bodyMessage);
  }

  @Post("/quiz")
  @HttpCode(204)
  @UsePipes(new JoiValidationPipe(contactsValidator))
  async sendQuiz(@Body() bodyQuiz: QuizDto): Promise<void> {
    return this.clientService.sendQuizTelegram(bodyQuiz);
  }
}
