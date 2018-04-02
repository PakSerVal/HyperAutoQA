import {User} from '../../../shared/models/user';

export class Question {
  constructor(
    public title: string,
    public body: string,
    public author: User,
    public id?: number
  ) {}
}
