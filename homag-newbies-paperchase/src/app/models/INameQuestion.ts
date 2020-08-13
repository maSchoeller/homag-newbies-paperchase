import { IQuestion } from "./IQuestion";

export default interface INameQuestion extends IQuestion {
  answers: string[],
  caseSensitive: boolean,
  requiredAnswers: number
}
