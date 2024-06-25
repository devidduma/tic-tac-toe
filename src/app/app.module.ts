import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BoardComponent} from "./components/board/board.component";
import {FeedbackComponent} from "./components/feedback/feedback.component";
import {ScoresComponent} from "./components/scores/scores.component";
import {ScoresService} from "./services/scores.service";

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
