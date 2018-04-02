import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../shared/services/question.service';
import {Question} from '../shared/models/question';
import {User} from '../../shared/models/user';
import {AlertService} from '../../shared/services/alert.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html'
})
export class QuestionsListComponent implements OnInit {

  user: User;

  questions: Question[];

  constructor(
    private alertService: AlertService,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.getQuestions();
  }

  onDelete(id: number) {
    return this.questionService.deleteQuestion(id).subscribe(
      () => {
        this.alertService.success('Ваш вопрос удалён!');
        this.getQuestions();
      }
    );
  }

  private getQuestions() {
    this.questionService.getQuestions().subscribe(
      (questions: Question[]) => this.questions = questions
    );
  }

  isMyquestion(userId: number) {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.id === userId;
  }
}
