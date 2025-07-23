import {Component, OnInit} from '@angular/core';
import {FeedbackService} from "../../services/feedback.service";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent implements OnInit {

  feedbackMessage!: Observable<string>;

  constructor(private feedbackService: FeedbackService) {
  }

  ngOnInit() {
    this.feedbackMessage = this.feedbackService.getFeedbackMessage();
  }
}
