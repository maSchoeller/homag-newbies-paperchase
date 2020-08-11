import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  constructor(private routerArgs: ActivatedRoute) { }

  ngOnInit(): void {
    let args = this.routerArgs.snapshot.params;
    console.log();
  }

}
