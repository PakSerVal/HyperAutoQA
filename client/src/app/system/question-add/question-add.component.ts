import { Component, OnInit } from '@angular/core';
import {Question} from '../shared/models/question';
import {NgForm} from '@angular/forms';
import {QuestionService} from '../shared/services/question.service';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/services/alert.service';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html'
})
export class QuestionAddComponent implements OnInit {

  question: Question;

  constructor(
    private questionService: QuestionService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const {title, body} = form.value;
    this.questionService.addQuestion(title, body).subscribe(
      (question: Question) => {
        this.alertService.success('Ваш вопрос сохранён!', true);
        this.router.navigate(['/system', 'questions']);
      });
  }

}
