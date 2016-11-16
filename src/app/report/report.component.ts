import { Component, OnInit } from '@angular/core';
import { Alien, Encounter } from '../models';
import AliensService from '../services/aliens.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [AliensService]
})
export class ReportComponent implements OnInit {

  encounter: Encounter;
  aliensList: Alien[];

  NO_ALIEN_TYPE_SELECTED = "(none)";

  constructor(aliensService: AliensService) {
      aliensService.getAliens().subscribe((aliens) => {
      this.aliensList = aliens;
    }, (err) => {
      console.log(err);
    });

   }

  ngOnInit() {
  }

}
