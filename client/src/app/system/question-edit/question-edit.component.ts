import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {QuestionService} from '../shared/services/question.service';
import {Question} from '../shared/models/question';
import {NgForm} from '@angular/forms';
import {AlertService} from '../../shared/services/alert.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html'
})
export class QuestionEditComponent implements OnInit {

  question: Question;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const questionId = +params['id'];
      this.getQuestion(questionId);
    });
  }

  onSubmit(form: NgForm) {
    const {title, body} = form.value;
    this.questionService.updateQuestion(this.question.id, title, body).subscribe(
      () => {
        this.alertService.success('Вопрос отредактирован!', true)
        this.router.navigate(['/system', 'questions']);
      });
  }
  private getQuestion(questionId: number) {
    this.questionService.getQuestionById(questionId).subscribe(
      (question: Question) => this.question = question
    );
  }
}
