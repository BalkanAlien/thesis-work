import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dx-login',
  templateUrl: './dx-login.component.html',
  styleUrls: ['./dx-login.component.css']
})
export class DxLoginComponent implements OnInit {

  ngOnInit(): void {
  }

  dxloginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    org: new FormControl('', [Validators.required])
  })

  get email() {
    return this.dxloginForm.get('email');
  }

  get password() {
    return this.dxloginForm.get('password');
  }

  get org() {
    return this.dxloginForm.get('org');
  }
  
}
