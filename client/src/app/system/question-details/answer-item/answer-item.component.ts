import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Answer} from '../../shared/models/answer';

@Component({
  selector: 'app-answer-item',
  templateUrl: './answer-item.component.html'
})
export class AnswerItemComponent implements OnInit {

  @Input() answer: Answer;
  @Input() myAnswer: boolean;
  @Output() updateAnswer = new EventEmitter();
  @Output() deleteAnswer = new EventEmitter();

  editMode = false;

  constructor() { }

  ngOnInit() {
  }

  onEdit() {
    this.editMode = true;
  }

  update() {
    this.editMode = false;
    this.updateAnswer.emit(this.answer);
  }

  delete() {
    this.editMode = false;
    this.deleteAnswer.emit(this.answer.id);
  }

}
