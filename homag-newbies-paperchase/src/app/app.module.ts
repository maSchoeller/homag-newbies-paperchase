import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScannerComponent } from './home/scanner/scanner.component';
import { QuestionComponent } from './home/question/question.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MapsComponent } from './home/maps/maps.component';
import {MatDialogModule} from '@angular/material/dialog';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { DialogComponent } from './home/dialog/dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ScannerComponent,
    QuestionComponent,
    PageNotFoundComponent,
    MapsComponent,
    DialogComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    ZXingScannerModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
