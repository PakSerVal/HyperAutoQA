import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {BaseService} from '../../../shared/core/base.service';
import {Question} from '../models/question';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class QuestionService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get(this.getUrl('/questions'), this.getHttpOptions())
      .map(this.extractQuestions);
  }

  getQuestionById(questionId: number): Observable<Question> {
    return this.http.get(this.getUrl('/questions/' + questionId), this.getHttpOptions())
      .map(this.extractQuestion);
  }

  updateQuestion(questionId: number, questionTitle: string, questionBody: string) {
    const body = {questionId: questionId, questionTitle: questionTitle, questionBody: questionBody};
    return this.http.put(this.getUrl('/questions'), body, this.getHttpOptions())
      .map(this.extractQuestion);
  }

  addQuestion(questionTitle: string, questionBody: string) {
    const body = {questionTitle: questionTitle, questionBody: questionBody};
    return this.http.post(this.getUrl('/questions'), body, this.getHttpOptions())
      .map(this.extractQuestion);
  }

  deleteQuestion(questionId: number) {
    return this.http.delete(this.getUrl('/questions/' + questionId), this.getHttpOptions());
  }

  private getHttpOptions() {
    return {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    )};
  }

  extractQuestion(response: Response) {
    const data = response.json();
    return new Question(data.title, data.body, data.user, data.id);
  }

  extractQuestions(response: Response) {
    const data = response.json();
    const questions: Question[] = [];
    for (let i = 0; i < data.length; i++) {
      questions.push(new Question(data[i].title, data[i].body, data[i].user, data[i].id));
    }
    return questions;
  }
}
