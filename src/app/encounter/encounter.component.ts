import { Component, OnInit } from '@angular/core';
import EncountersService from '../services/encounters.service';
import { EncounterColonist, Colonist } from '../models';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.css'],
  providers: [EncountersService]
})
export class EncounterComponent implements OnInit {

  encounter: EncounterColonist;
  colonist: Colonist;

  constructor(private _encountersService: EncountersService) {
    let id = 4;
    this.colonist = new Colonist(null, null, null, null);
    this.encounter = new EncounterColonist(null, null, null, null, null, this.colonist);
    _encountersService.getSingleEncountersWithColonist(id).subscribe((singleEncounter)=>{
        return this.encounter = singleEncounter[0];
        },
      (err)=>{
        console.log(err);
      });    
    }

  ngOnInit() {
  }

}
