import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { State } from './state';
import { BackendUri } from './app-settings';

@Injectable()
export class StateService {

  constructor(
    private _http: Http,
    @Inject(BackendUri) private _backendUri: string) { }

  getStates(): Observable<State[]> {
    return this._http
      .get(`${this._backendUri}/states`)
      .map((data: Response): State[] => State.fromJsonToList(data.json()));
  }

}
