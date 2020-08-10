export interface IQuestion {
  id: string,
  header: string,
  message: string,
  type: Questiontype,
  imagePath: string,
}

export enum Questiontype {
  Number = "number",
  MultipleChoice = "multipleChoice",
  Name = "name"
}
