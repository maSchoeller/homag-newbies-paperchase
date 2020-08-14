export interface IQuestion {
  id: string,
  // header: string,
  message: string,
  type: Questiontype,
  imagePath: string,
  nextLocation: {
    longitude : string,
    latitude: string
  }
}

export enum Questiontype {
  Number = 'number',
  MultipleChoice = 'multipleChoice',
  Name = 'name',
  MultiName = 'multiname'

}
