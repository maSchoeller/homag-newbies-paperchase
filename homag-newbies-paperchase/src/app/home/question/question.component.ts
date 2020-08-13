import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionLoaderService } from '../../services/question-loader.service';
import { IQuestion, Questiontype } from 'src/app/models/IQuestion';

import INumberQuestion from 'src/app/models/INumberQuestion';
import INameQuestion from 'src/app/models/INameQuestion';
import {
  IMultipleChoiceQuestion,
  IAnswer,
} from 'src/app/models/IMultipleChoiceQuestion';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionLoader: QuestionLoaderService,
    private dialog: MatDialog
  ) {
    let routeParams = this.route.snapshot.params;
    this.question = this.questionLoader.findQuestion(routeParams.id);
    if (this.question) {
      this.questionFound = true;
    }
    if (this.isNameQuestion(this.question)) {
      this.nameSelections = new Array<{ value: string; nr: number }>(
        this.question.requiredAnswers
      );
      this.nameSelections.forEach((element, it) => {
        element.value = '';
        element.nr = it;
      });
    }
  }

  question: IQuestion;
  multipleChoiceSelection: IAnswer;
  nameSelections: { value: string; nr: number }[];
  numberSelection: number;
  questionFound: boolean;

  ngOnInit(): void {

  }

  isNumberQuestion(q: IQuestion): q is INumberQuestion {
    return q.type === Questiontype.Number;
  }

  isNameQuestion(q: IQuestion): q is INameQuestion {
    return q.type === Questiontype.Name;
  }

  isMultipleChoiceQuestion(q: IQuestion): q is IMultipleChoiceQuestion {
    return q.type === Questiontype.MultipleChoice;
  }

  async checkAnswer() {
    let right = false;
    if (
      this.isMultipleChoiceQuestion(this.question) &&
      this.multipleChoiceSelection?.right
    ) {
      right = true;
    } else if (this.isNameQuestion(this.question)) {
      if (
        this.nameSelections.every((a) =>
          (this.question as INameQuestion).answers.some(
            (aa) =>
              (!(<any>this.question).caseSensitive &&
                aa.toUpperCase() == a.value?.toUpperCase()) ||
              aa == a.value
          )
        )
      ) {
        right = true;
      }
    } else if (
      this.isNumberQuestion(this.question) &&
      Math.abs(this.question.answer - this.numberSelection) <=
        this.question.range * this.question.answer
    ) {
      right = true;
    }
    if (right) {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: { successful: true },
      });
      await dialogRef.afterClosed().toPromise();
      await this.router.navigate([
        'map',
        this.question.nextLocation.latitude,
        this.question.nextLocation.longitude,
      ]);
    } else {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: { successful: false },
      });
    }
  }
}
