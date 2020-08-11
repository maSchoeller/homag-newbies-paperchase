import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {

  constructor(private router: Router) { }

  scannerEnabled: boolean = false;
  errorMessage: string
  errorMessageHasDevice: string

  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent;

  ngOnInit(): void {
  }

  scanSuccessHandler($event: any) {
    console.log($event);
    this.router.navigate(['/question', $event])
  }

  async enableScanner() {
    let result = await this.scanner.askForPermission();
    this.scannerEnabled = true;
    this.errorMessageHasDevice = result+'ask for permission';
  }

  displayMessage(message: string) {
    this.errorMessage = message;
    console.log(message)
  }
  displayMessageHasDevice(message: string) {
    this.errorMessageHasDevice = message;
    console.log(message)
  }

  camerasFoundHandler($event: MediaDeviceInfo[]){
    console.log($event);
    this.scanner.device = $event[0];
  }


}
