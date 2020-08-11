import { Component, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {

  constructor(private router: Router, private location: Location) { }

  scannerEnabled: boolean = true;
  errorMessage: string

  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent;

  ngOnInit(): void {
  }

  scanSuccessHandler($event: any) {
    console.log($event);
    this.router.navigate(['/question', $event])
  }


  noPermission(permission:  boolean) {
    if (!permission) {
      this.errorMessage = 'Die Kamera konnte nicht geöffnet werden, evtl. hast du den Kamerazugriff (global) deaktiviert.';
    }
  }

  noCamerasFound($event: any) {
    this.errorMessage = 'Es wurde keine Kamera gefunden.' + $event;
  }


  goBack() {
    this.location.back();
  }
}
