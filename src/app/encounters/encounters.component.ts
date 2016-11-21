import { Component, OnInit } from '@angular/core';
import EncountersService from '../services/encounters.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.css'],
  providers: [EncountersService],
})
export class EncountersComponent implements OnInit {

  encountersList: {}[];

  constructor(private _encountersService: EncountersService) {
        _encountersService.getEncountersWithColonist().subscribe((encounters)=>{
          console.log(encounters);
            return this.encountersList = encounters;
            },
          (err)=>{
            console.log(err);
          });
    }

  ngOnInit() {

  }

}
