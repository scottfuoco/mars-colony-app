import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Colonist, NewColonist} from '../models';

@Injectable()
export default class ColonistsService {

  COLONIST_URL = 'https://red-wdp-api.herokuapp.com/api/mars/colonists';
 
  constructor(private http: Http) { }

  registerColonist(colonist: NewColonist): Observable<Colonist>{
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(this.COLONIST_URL, {colonist}, {headers})
                    .map((res: Response) => res.json().colonist || {});
  }

  getColonists(): Observable<Colonist[]> {
    return this.http.get(this.COLONIST_URL)
                    .map((res: Response) => res.json().colonist || {});
  }
}
