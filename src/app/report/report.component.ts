import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Alien, Encounter, NewEncounter, Colonist } from '../models';
import AliensService from '../services/aliens.service';
import EncountersService from '../services/encounters.service';
import { cantBe } from '../shared/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [AliensService, EncountersService]
})
export class ReportComponent implements OnInit {

  encounter: Encounter;
  aliensList: Alien[];
  reportForm: FormGroup;

  NO_ALIEN_TYPE_SELECTED = "(none)";

  constructor(private _aliensService: AliensService,
              private _encountersService: EncountersService,
              private _router: Router) {

      _aliensService.getAliens().subscribe((aliens) => {
      this.aliensList = aliens;
    }, (err) => {
      console.log(err);
    });

   }

  ngOnInit() {
    this.reportForm = new FormGroup({
      atype: new FormControl(this.NO_ALIEN_TYPE_SELECTED, [cantBe(this.NO_ALIEN_TYPE_SELECTED)]),
      action: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const date = this.getToday();
    const colonist: Colonist = JSON.parse(localStorage.getItem('colonist'));
    const colonist_id = colonist.id.toString();
    const atype = this.reportForm.get('atype').value;
    const action = this.reportForm.get('action').value;

    const encounter = new NewEncounter(date, colonist_id, atype, action);
    
    this._encountersService.submitEncounter(encounter).subscribe(() => {
      this._router.navigate(['/encounters']);
    }, (err) => {
      console.log(err);
    });
  }

  private getToday() {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    return `${yyyy}-${mm}-${dd}`;

  }

}
