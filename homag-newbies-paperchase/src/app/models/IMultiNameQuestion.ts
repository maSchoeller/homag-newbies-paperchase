import { IQuestion } from "./IQuestion";

export interface IMultiNameQuestion extends IQuestion {
  questions: ISingleQuestion[],
}

export interface ISingleQuestion {
  text: string,
  anwser: string,
  // caseSensitive: boolean,
}




