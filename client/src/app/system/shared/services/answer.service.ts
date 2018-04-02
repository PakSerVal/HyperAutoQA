import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {BaseService} from '../../../shared/core/base.service';
import {Answer} from '../models/answer';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AnswerService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  getByQuestion(questionId: number): Observable<Answer[]> {
    return this.http.get(this.getUrl('/answers/get-by-question/' + questionId), this.getHttpOptions())
      .map(this.extractAnswers);
  }

  addAnswer(answer: string, questionId: number): Observable<Answer[]>  {
    const body = {answerBody: answer, questionId: questionId};
    return this.http.post(this.getUrl('/answers'), body, this.getHttpOptions())
      .map(this.extractAnswers);
  }

  updateAnswer(answerId: number, answerBody: string) {
    const body = {answerId: answerId, answerBody: answerBody};
    return this.http.put(this.getUrl('/answers'), body, this.getHttpOptions())
      .map(this.extractAnswer);
  }

  deleteAnswer(answerId: number) {
    return this.http.delete(this.getUrl('/answers/' + answerId), this.getHttpOptions());
  }

  private getHttpOptions() {
    return {
      headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      )};
  }


  private extractAnswer(response: Response) {
    const data = response.json();
    const answer = new Answer(data.body, data.user, data.question, data.id);
    return answer;
  }

  private extractAnswers(response: Response) {
    const data = response.json();
    const answers: Answer[] = [];
    for (let i = 0; i < data.length; i++) {
      answers.push(new Answer(data[i].body, data[i].user, data[i].question, data[i].id));
    }
    return answers;
  }
}
