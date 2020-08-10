import { IQuestion } from "./IQuestion";

export default interface INumberQuestion extends IQuestion {
  answer: number,
  range: number
}
