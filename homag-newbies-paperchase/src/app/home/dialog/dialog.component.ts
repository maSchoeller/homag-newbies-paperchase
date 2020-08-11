import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  answer : string;
  ngOnInit(): void {
    if (this.data.successful) {
      this.answer = "Die Antwort ist richtig!";
    }
    else {
      this.answer = "Die Antwort ist leider falsch!";
    }
  }

}
