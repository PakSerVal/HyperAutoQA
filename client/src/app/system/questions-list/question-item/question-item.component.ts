import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../shared/models/question';
import {Answer} from '../../shared/models/answer';
import {AnswerService} from '../../shared/services/answer.service';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html'
})
export class QuestionItemComponent implements OnInit {

  @Input() question: Question;
  @Input() myQuestion: boolean;
  @Output() deleteQuestion = new EventEmitter();

  answers: Answer[];

  constructor(
    private answerService: AnswerService
  ) { }

  ngOnInit() {
    this.answerService.getByQuestion(this.question.id).subscribe(
      (answers: Answer[]) => this.answers = answers
    );
  }

  delete(id: number) {
    this.deleteQuestion.emit(id);
  }
}
