import { IQuestion } from "./IQuestion";

export default interface IMultipleChoiceQuestion extends IQuestion {
  answer : {
    key: string,
    right: boolean
  }[]
}
