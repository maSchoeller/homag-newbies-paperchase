import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionLoaderService} from '../../services/question-loader.service'
import { IQuestion, Questiontype } from 'src/app/models/IQuestion';

import INumberQuestion from 'src/app/models/INumberQuestion';
import INameQuestion from 'src/app/models/INameQuestion';
import {IMultipleChoiceQuestion, IAnswer} from 'src/app/models/IMultipleChoiceQuestion';

@Component({
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private questionLoader: QuestionLoaderService
             ) { }

  question: IQuestion;
  multipleChoiceSelection: IAnswer;

  ngOnInit(): void {
    let routeParams = this.route.snapshot.params;
    console.log(routeParams.id);
    this.question = this.questionLoader.findQuestion(routeParams.id);
  }

  isNumberQuestion(q: IQuestion): q is INumberQuestion{
    return q.type=== Questiontype.Number;
  }

  isNameQuestion(q: IQuestion): q is INameQuestion{
    return q.type === Questiontype.Name;
  }

  isMultipleChoiceQuestion(q: IQuestion): q is IMultipleChoiceQuestion{
    return q.type === Questiontype.MultipleChoice;

  }

  checkAnswer() {
    if (this.isMultipleChoiceQuestion(this.question)) {
      console.log(this.multipleChoiceSelection);
      if (this.multipleChoiceSelection.right) {

      }
      else {

      }
    }
    else if (this.isNameQuestion(this.question)) {

    } else if(this.isNumberQuestion(this.question)) {

    } else {
      console.log("Unsupported Question type.");
    }
  }
}
