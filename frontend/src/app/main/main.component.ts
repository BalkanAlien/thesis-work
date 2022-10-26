import { Component, OnInit } from '@angular/core';
import { GetMessagesService } from './get-messages.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ GetMessagesService ]
})

export class MainComponent implements OnInit {
  
  ArrayOfMessages: Array<any> = [];
  constructor(private gms: GetMessagesService) { }

  ngOnInit(): void {
    this.showCannedMessages();
  }

  showCannedMessages() {
    this.gms.getCannedMessages(2307475884, '2307475884%3A3250042652855494%3AT2vPmE97qolpOd78wC6vJtxMkCCI7Rd%2B%3Aalphado1')
    .subscribe((response: any) => {
      console.log(response);
      this.ArrayOfMessages = response;
    }); 
  }
}
