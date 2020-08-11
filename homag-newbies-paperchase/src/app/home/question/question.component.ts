import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionLoaderService} from '../../services/question-loader.service'
import { IQuestion, Questiontype } from 'src/app/models/IQuestion';

import INumberQuestion from 'src/app/models/INumberQuestion';
import INameQuestion from 'src/app/models/INameQuestion';
import {IMultipleChoiceQuestion, IAnswer} from 'src/app/models/IMultipleChoiceQuestion';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private questionLoader: QuestionLoaderService,
              private dialog: MatDialog) {
               this.nameSelection = '';
              }

  question: IQuestion;
  multipleChoiceSelection: IAnswer;
  nameSelection: string;
  numberSelection: number;
  questionFound: boolean;

  ngOnInit(): void {
    let routeParams = this.route.snapshot.params;
    console.log(routeParams.id);
    this.question = this.questionLoader.findQuestion(routeParams.id);
    if (this.question) {
      this.questionFound = true;
    }
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
    let right = false;
    if (this.isMultipleChoiceQuestion(this.question)) {
      console.log(this.multipleChoiceSelection);
      if (this.multipleChoiceSelection.right) {
          right = true;
        }
      }
    else if (this.isNameQuestion(this.question)) {
      if (this.question.answer === this.nameSelection) {
        right = true;
      }
    } else if(this.isNumberQuestion(this.question)) {
        if (Math.abs(this.question.answer - this.numberSelection) <= (this.question.range*this.question.answer)) {
          right = true;
        }
    } else {
      console.log("Unsupported Question type.");
      return;
    }
    if (right) {
      const dialogRef = this.dialog.open(DialogComponent, { data : { successful: true }});
    }
    else {
      const dialogRef = this.dialog.open(DialogComponent, { data : { successful: false }});
    }
  }
}
