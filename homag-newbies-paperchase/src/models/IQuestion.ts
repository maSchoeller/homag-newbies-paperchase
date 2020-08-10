export interface IQuestion {
  id: string,
  header: string,
  message: string,
  type: Questiontype,
  imagePath: string,
}

export enum Questiontype {
  Number,
  MultipleChoice,
  Name
}
