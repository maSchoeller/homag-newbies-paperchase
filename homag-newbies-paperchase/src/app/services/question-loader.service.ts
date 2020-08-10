import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { IQuestion } from '../models/IQuestion'
import { DateAdapter } from '@angular/material/core';
import QuestionJson from '../../questions.json';

@Injectable({
  providedIn: 'root'
})
export class QuestionLoaderService {
  constructor() {
      console.log(QuestionJson);
      this.data = QuestionJson as any;
  }

  private data: IQuestion[];

  get questions() {
    return this.data;
  }

  public findQuestion(id: string){
    return this.data.find((d) => d.id === id);
  }
}


