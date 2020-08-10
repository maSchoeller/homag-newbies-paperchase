import { IQuestion } from "./IQuestion";

export default interface INameQuestion extends IQuestion {
  answer: string,
  caseSensitive: boolean
}
