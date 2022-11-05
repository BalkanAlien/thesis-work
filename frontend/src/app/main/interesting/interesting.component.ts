import { Component, OnInit } from '@angular/core';
import { GetMessagesService } from '../get-messages.service';
@Component({
  selector: 'app-interesting',
  templateUrl: './interesting.component.html',
  styleUrls: ['./interesting.component.css']
})
export class InterestingComponent implements OnInit {

  ArrayOfMessages: Array<any> = [];
  constructor(private gms: GetMessagesService) { }

  ngOnInit(): void {
    this.showMessages();
  }

  showMessages() {
    this.gms.getCannedMessages(2307475884, '2307475884%3A3250042652855494%3AT2vPmE97qolpOd78wC6vJtxMkCCI7Rd%2B%3Aalphado1')
    .subscribe((response: any) => {
      console.log(response);
      this.ArrayOfMessages = response;
    });
  }
}
