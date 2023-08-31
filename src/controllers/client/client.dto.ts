import { ECountry, EForWhat, EPower, EProblem } from "../../enums/EQuiz";

abstract class BaseClientDto {
  name: string;
  phone: string;
  email: string;
}

export class MessageDto extends BaseClientDto {
  currentGood: string;
}

export class QuizDto extends BaseClientDto {
  forWhat: EForWhat;
  problem: EProblem;
  power: EPower;
  country: ECountry;
  whichCountry: string;
}
