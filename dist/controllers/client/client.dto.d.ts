import { ECountry, EForWhat, EPower, EProblem } from "../../enums/EQuiz";
declare abstract class BaseClientDto {
    name: string;
    phone: string;
    email: string;
}
export declare class MessageDto extends BaseClientDto {
    currentGood: string;
}
export declare class QuizDto extends BaseClientDto {
    forWhat: EForWhat;
    problem: EProblem;
    power: EPower;
    country: ECountry;
    whichCountry: string;
}
export {};
