import { IQuestion } from "./IQuestion";

export interface IMultipleChoiceQuestion extends IQuestion {
  answers : IAnswer[]
}

export interface IAnswer {
  text: string,
  right: boolean
}
