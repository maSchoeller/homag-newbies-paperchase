import { IQuestion } from "./IQuestion";

export default interface INameQuestion extends IQuestion {
  answer: number,
  range: number
}
