import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private feedbackMessage: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() {}

  getFeedbackMessage(): Observable<string> {
    return this.feedbackMessage.asObservable();
  }

  setFeedbackMessage(message: string) {
    this.feedbackMessage.next(message);
  }
}
