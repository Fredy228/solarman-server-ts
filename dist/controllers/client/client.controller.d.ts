import { ClientService } from "./client.service";
import { MessageDto, QuizDto } from "./client.dto";
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    sendOnTelegram(bodyMessage: MessageDto): Promise<void>;
    sendQuiz(bodyQuiz: QuizDto): Promise<void>;
}
