import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SystemComponent} from './system.component';
import {QuestionsListComponent} from './questions-list/questions-list.component';
import {QuestionDetailsComponent} from './question-details/question-details.component';
import {QuestionEditComponent} from './question-edit/question-edit.component';
import {QuestionAddComponent} from './question-add/question-add.component';
import {AuthGuard} from '../shared/services/auth.guard';

const routes: Routes = [
  {
    path: '', component: SystemComponent, canActivate: [AuthGuard], children: [
      {path: 'questions', component: QuestionsListComponent},
      {path: 'questions/details/:id', component: QuestionDetailsComponent},
      {path: 'questions/edit/:id', component: QuestionEditComponent},
      {path: 'questions/add', component: QuestionAddComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
