import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';

import {SystemComponent} from './system.component';
import {QuestionsListComponent} from './questions-list/questions-list.component';
import {QuestionItemComponent} from './questions-list/question-item/question-item.component';
import {QuestionDetailsComponent} from './question-details/question-details.component';
import {QuestionEditComponent} from './question-edit/question-edit.component';
import {QuestionAddComponent} from './question-add/question-add.component';
import {AnswerItemComponent} from './question-details/answer-item/answer-item.component';

import {QuestionService} from './shared/services/question.service';
import {AnswerService} from './shared/services/answer.service';

import {SafePipe } from './shared/pipes/safe.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [
    SystemComponent,
    QuestionsListComponent,
    QuestionItemComponent,
    QuestionDetailsComponent,
    SafePipe,
    QuestionEditComponent,
    QuestionAddComponent,
    AnswerItemComponent
  ],
  providers: [QuestionService, AnswerService]
})
export class SystemModule {}
