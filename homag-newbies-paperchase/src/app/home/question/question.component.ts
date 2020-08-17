import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionLoaderService } from '../../services/question-loader.service';
import { IQuestion, Questiontype } from 'src/app/models/IQuestion';

import INumberQuestion from 'src/app/models/INumberQuestion';
import INameQuestion from 'src/app/models/INameQuestion';
import { IMultiNameQuestion } from 'src/app/models/IMultiNameQuestion';
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
  ) {}

  question: IQuestion;
  multipleChoiceSelection: IAnswer;
  nameSelections: { value: string; nr: number | string }[];
  numberSelection: number;
  questionFound: boolean;

  ngOnInit(): void {
    let routeParams = this.route.snapshot.params;
    this.question = this.questionLoader.findQuestion(routeParams.id);
    if (this.question) {
      this.questionFound = true;
      if (this.isNameQuestion(this.question)) {
        this.nameSelections = new Array<{ value: string; nr: number }>(
          this.question.requiredAnswers
        );
        for (let index = 0; index < this.nameSelections.length; index++) {
          this.nameSelections[index] = {
            nr: index + 1,
            value: '',
          };
        }
      } else if (this.isMultiNameQuestion(this.question)) {
        this.nameSelections = new Array<{ value: string; nr: number | string }>(
          this.question.questions.length
        );
        for (let index = 0; index < this.nameSelections.length; index++) {
          this.nameSelections[index] = {
            nr: this.question.questions[index].text,
            value: '',
          };
        }
      }
    }
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

  isMultiNameQuestion(q: IQuestion): q is IMultiNameQuestion {
    return q.type === Questiontype.MultiName;
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
                aa.toUpperCase() == a.value?.trim().toUpperCase()) ||
              aa == a.value?.trim()
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
    } else if (
      this.isMultiNameQuestion(this.question) &&
      this.question.questions.every(
        (q, it) => q.anwser == this.nameSelections[it]?.value
      )
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
