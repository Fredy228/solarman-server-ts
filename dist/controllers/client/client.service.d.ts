import { MessageDto, QuizDto } from "./client.dto";
export declare class ClientService {
    sendSmsTelegram({ name, phone, email, currentGood, }: MessageDto): Promise<void>;
    sendQuizTelegram(value: QuizDto): Promise<void>;
}
