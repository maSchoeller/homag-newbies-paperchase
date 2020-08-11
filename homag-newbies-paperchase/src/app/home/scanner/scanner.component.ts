import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {

  constructor(private router: Router) { }

  scannerEnabled: boolean = true;


  ngOnInit(): void {
  }

  scanSuccessHandler($event: any) {
    console.log($event);
    this.router.navigate(['/question', $event])
  }

  enableScanner() {
    this.scannerEnabled = true;
  }

}
