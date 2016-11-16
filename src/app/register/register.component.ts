import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewColonist, Job } from '../models';
import JobsService from '../services/jobs.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [JobsService],
})
export class RegisterComponent implements OnInit {

  colonist: NewColonist;
  jobsList: Job[];
 
  public registerForm = FormGroup;

  NO_JOB_SELECTED = '(none)';

  constructor(jobsService: JobsService, private _fb: FormBuilder) {
    this.colonist = new NewColonist(null, null, this.NO_JOB_SELECTED);
    jobsService.getJobs().subscribe((jobs) => {
      this.jobsList = jobs;
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {

  }

  initAddress() {
          // initialize our address
          return this._fb.group({
              street: ['', Validators.required],
              postcode: ['']
          });
      }

  get jobSelected() {
    return this.colonist.job_id !== this.NO_JOB_SELECTED;
  }

  onSubmit(event, registerForm){
    event.preventDefault();
    console.log(registerForm);
    registerForm.form.controls.age.invalid = true;
  }
}