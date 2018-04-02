import {User} from '../../../shared/models/user';
import {Question} from './question';

export class Answer {
  constructor(
    public body: string,
    public author: User,
    public question: Question,
    public id?: number
  ) {}
}
