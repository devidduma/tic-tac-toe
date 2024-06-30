import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScoresService} from "./services/scores.service";
import {BoardComponent} from "./components/board/board.component";
import {FeedbackComponent} from "./components/feedback/feedback.component";
import {ScoresComponent} from "./components/scores/scores.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BoardComponent,
    FeedbackComponent,
    ScoresComponent
  ],
  providers: [
    ScoresService
  ]
})
export class AppModule { }
