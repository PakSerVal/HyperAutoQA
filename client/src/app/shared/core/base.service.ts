import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable()
export class BaseService {

  private baseUrl = environment.apiUrl;

  constructor() {}

  protected getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }
}
