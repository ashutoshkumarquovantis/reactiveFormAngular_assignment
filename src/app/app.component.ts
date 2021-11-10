import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signUpForm : FormGroup;
  forbiddenName : string[] = ['test', 'test2'];
  forbiddenEmail : string[] = ['test@test.com'];
  status : string[] = ['Stable', 'Critical', 'Finished'];

  ngOnInit(){
    this.signUpForm = new FormGroup({
      'projectName' : new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
      'email' : new FormControl(null , [Validators.required, Validators.email], [this.forbiddenEmails.bind(this)]),
      'status' : new FormControl('Critical')
    })
  }

  onSubmit(){
    console.log(this.signUpForm);
  }

  forbiddenNames(control : FormControl) : {[s : string] : boolean} {
    if(this.forbiddenName.indexOf(control.value) !== -1){
      return {'nameIsForbidden' : true}
    }
    return null;
  }

  forbiddenEmails(control : FormControl) : Promise<any> | Observable<any> {
    const promise = new Promise <any> ((res, rej) => {
      setTimeout(() => {
        if(this.forbiddenEmail.indexOf(control.value) !== -1){
          res({'emailIsForbidden' : true});
        }
        else res(null);
      }, 2222);
    });
    return promise;
  }
}
