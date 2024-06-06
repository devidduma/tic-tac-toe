import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BoardComponent} from "./components/board/board.component";
import {ScoresComponent} from "./components/scores/scores.component";
import {FeedbackComponent} from "./components/feedback/feedback.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoardComponent, ScoresComponent, FeedbackComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
