import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-bold-login',
  templateUrl: './bold-login.component.html',
  styleUrls: ['./bold-login.component.css']
})
export class BoldLoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  boldLoginForm = new FormGroup({
    apiKey: new FormControl('', [Validators.required])
  })

  get apiKey() {
    return this.boldLoginForm.get('apiKey');
  }

  apiKeyValidator(control: FormControl) { 
    let apiKey = control.value; 
    if(apiKey === '2307475884%3A3250042652855494%3AT2vPmE97qolpOd78wC6vJtxMkCCI7Rd%2B%3Aalphado1') {
      return apiKey;
    }
    return null;
  }
}
