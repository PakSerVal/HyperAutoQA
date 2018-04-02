import {Component, OnInit} from '@angular/core';
import {Question} from '../shared/models/question';
import {Answer} from '../shared/models/answer';
import {ActivatedRoute, Params} from '@angular/router';
import {QuestionService} from '../shared/services/question.service';
import {AnswerService} from '../shared/services/answer.service';
import {AlertService} from '../../shared/services/alert.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html'
})
export class QuestionDetailsComponent implements OnInit {

  question: Question;
  answers: Answer[];
  myAnswer: string;

  constructor(
    private alertService: AlertService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const questionId = +params['id'];
      this.getQuestion(questionId);
      this.getAnswers(questionId);
    });
  }

  private getQuestion(questionId: number) {
    this.questionService.getQuestionById(questionId).subscribe(
      (question: Question) => this.question = question
    );
  }

  private getAnswers(questionId: number) {
    this.answerService.getByQuestion(questionId).subscribe(
      (answers: Answer[]) => this.answers = answers
    );
  }

  submitAnswer() {
    if (this.myAnswer) {
      this.answerService.addAnswer(this.myAnswer, this.question.id).subscribe(
        () => {
          this.alertService.success('Ваш ответ сохранён!');
          this.myAnswer = null;
          this.getAnswers(this.question.id);
        }
      );
    }
  }

  onUpdate(answer: Answer) {
    this.answerService.updateAnswer(answer.id, answer.body).subscribe(
      () => {
        this.alertService.success('Ответ отредактирован!');
        this.getAnswers(this.question.id);
      }
    );
  }

  onDelete(answerId: number) {
    this.answerService.deleteAnswer(answerId).subscribe(
      () => {
        this.alertService.success('Ответ удалён!');
        this.getAnswers(this.question.id);
      }
    );
  }

  isMyAnswer(userId: number) {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.id === userId;
  }
}
