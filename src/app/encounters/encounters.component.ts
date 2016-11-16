import { Component, OnInit } from '@angular/core';
import { Encounter } from '../models';
import EncountersService from '../services/encounters.service';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.css'],
  providers: [EncountersService],
})
export class EncountersComponent implements OnInit {

  encountersList: Encounter[];

  constructor(encountersService: EncountersService) {
    encountersService.getEncounters().subscribe((encounters) => {
      this.encountersList = encounters.sort((a, b) => {
                                      return new Date(b.date).getTime() - new Date(a.date).getTime();
                                      })
                                      .splice(0,100);
    }, (err) => {
      console.log(err);
    });

  }

  ngOnInit() {
  }

}
