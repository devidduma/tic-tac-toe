import {Component, Input} from '@angular/core';
import {FeedbackService} from "../../services/feedback.service";

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {

  feedbackMessage: string = "";

  constructor(private feedbackService: FeedbackService) {
  }

  ngOnInit() {
    this.feedbackService.getFeedbackMessage().subscribe(data => {
      this.feedbackMessage = data
    });
  }

  protected readonly console = console;
}
