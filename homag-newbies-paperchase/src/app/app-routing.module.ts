import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScannerComponent } from './home/scanner/scanner.component';
import { QuestionComponent } from './home/question/question.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MapsComponent } from './home/maps/maps.component';

const routes: Routes = [
  { path: '', component: ScannerComponent, pathMatch: 'full' },
  { path: 'scanner', component: ScannerComponent },
  { path: 'question/:id', component: QuestionComponent},
  { path: 'map/:long/:lat', component: MapsComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
