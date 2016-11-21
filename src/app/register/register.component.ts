import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NewColonist, Job } from '../models';
import JobsService from '../services/jobs.service';
import { cantBe } from '../shared/validators';
import ColonistService from '../services/colonists.service';
import { Router } from '@angular/router';

import { Http, Response, Headers, RequestOptions } from '@angular/http';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [JobsService, ColonistService],
})
export class RegisterComponent implements OnInit {

  colonist: NewColonist;
  jobsList: Job[];
  registerForm: FormGroup;

  NO_JOB_SELECTED = '(none)';

  constructor(private _jobsService: JobsService,
              private _colonistService: ColonistService,
              private _router: Router) {
    _jobsService.getJobs().subscribe((jobs) => {
      this.jobsList = jobs;
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      age: new FormControl('', [Validators.required]),
      job_id: new FormControl(this.NO_JOB_SELECTED, [cantBe(this.NO_JOB_SELECTED)])
    });
  }

  onSubmit(event){
    event.preventDefault();

    if(this.registerForm.valid){
      const name = this.registerForm.get('name').value;
      const age = this.registerForm.get('age').value;
      const job_id = this.registerForm.get('job_id').value;

      const colonist = new NewColonist(name, age, job_id);

      this._colonistService.registerColonist(colonist).subscribe(
        (colonist)=>{
          localStorage.setItem('colonist', JSON.stringify(colonist));
          this._router.navigate(['/encounters']);
        },
        (err)=>{
          console.log(err);
        }
      );
    }
  }
}