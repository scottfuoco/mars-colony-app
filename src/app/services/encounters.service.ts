import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMapTo';

import { Encounter, NewEncounter, Colonist } from '../models';


@Injectable()
export default class EncountersService {

  ENCOUNTERS_URL = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';
  COLONIST_URL = 'https://red-wdp-api.herokuapp.com/api/mars/colonists';

  constructor(private http: Http) { }

  getEncounters(): Observable<Encounter[]> {
    return this.http.get(this.ENCOUNTERS_URL)
                    .map((res: Response) => res.json().encounters || {});
  }

  getEncountersWithColonist(){
    const encountersList =  this.http.get(this.ENCOUNTERS_URL)
                    .map((res: Response) => res.json().encounters
                                                .sort((a, b) => b.id - a.id)
                                                .splice(0,100));
                                                                        
    const colonistsList =  this.http.get(this.COLONIST_URL)
              .map((res: Response) => res.json().colonists
                                          .reduce((acc, colonist) => {
                                              acc[colonist.id] = colonist;
                                              return acc;    
                                          }));

    return encountersList.concatMapTo(colonistsList, (elist, clist) => {
        return elist.map((encounter) => {
          encounter.colonist = clist[encounter.colonist_id];
          return encounter;
        });
    });

  }

    getSingleEncountersWithColonist(id){
    const encountersList =  this.http.get(this.ENCOUNTERS_URL)
                    .map((res: Response) => res.json().encounters
                                                .filter((encounter)=>{
                                                  return encounter.colonist_id === id;
                                                }));
                                                                        
    const colonistsList =  this.http.get(this.COLONIST_URL)
              .map((res: Response) => res.json().colonists
                                          .filter((colonist) => {
                                              return colonist.id === id;
                                          }));

    return encountersList.concatMapTo(colonistsList, (elist, clist) => {
        return elist.map((encounter) => {
          encounter.colonist = clist[0];
          return encounter;
        });
    });

  }

  submitEncounter(encounter: NewEncounter): Observable<Encounter>{
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(this.ENCOUNTERS_URL, {encounter}, {headers})
                    .map((res: Response) => res.json().encounter || {});
  }
}