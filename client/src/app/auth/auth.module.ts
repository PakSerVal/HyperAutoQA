import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthComponent} from './auth.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {AuthRoutingModule} from './auth-routing.modul';

@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent,
        AuthComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AuthRoutingModule
    ]
})

export class AuthModule {}
