import { Component, OnInit } from '@angular/core';
import { GetMessagesService } from './get-messages.service';
import { GetTransformationsService } from './get-transformations.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ GetMessagesService ]
})

export class MainComponent implements OnInit {
  
  ArrayOfMessages: Array<any> = [];
  MessagesSent: Array<any> = [];
  TransformedMessages: Array<any> = [];
  TransformedMessagesSent: Array<any> = [];
  CollectedElements: Array<any> = [];
  SelectedTransformed: Array<any> = [];
  constructor(private gms: GetMessagesService, private tms: GetTransformationsService) { }

  ngOnInit(): void {
    this.showMessages('');
  }

  showMessages(id: string) {
    this.gms.getCannedMessages(2307475884, '2307475884%3A3250042652855494%3AT2vPmE97qolpOd78wC6vJtxMkCCI7Rd%2B%3Aalphado1')
    .pipe(finalize(() => this.sendMessages(id)))
    .subscribe((response: any) => {
      console.log(response);
      this.ArrayOfMessages = response;
      this.MessagesSent = this.ArrayOfMessages;
    });
    
  }

  sendMessages(id: String) {
    this.MessagesSent = [];
    for(let i=0; i<this.ArrayOfMessages.length; i++) {
      if((this.ArrayOfMessages[i].isFolder && this.ArrayOfMessages[i].parentId == id) ||
      (this.ArrayOfMessages[i].isFolder == false && this.ArrayOfMessages[i].itemFolderId == id)) {
        this.MessagesSent.push(this.ArrayOfMessages[i]);
      }
    }
    console.log(this.MessagesSent);
  }

  showTransformedMessages(id: string) {
    this.tms.getTransformedCannedMessages(2307475884, '2307475884%3A3250042652855494%3AT2vPmE97qolpOd78wC6vJtxMkCCI7Rd%2B%3Aalphado1')
    .pipe(finalize(() => this.sendTransformedMessages(id)))
    .subscribe((response: any) => {
      this.TransformedMessages = response;
      this.TransformedMessagesSent = this.TransformedMessages;
    });
  }

  sendTransformedMessages(id: String) {
    this.TransformedMessagesSent = [];
    if(id == '') //if we are in the root, show every folder and message.library==''
    {
      for(let i = 0; i < this.TransformedMessages.length; i++) {
        if(this.TransformedMessages[i].isLibrary || (!this.TransformedMessages[i].isLibrary && this.TransformedMessages[i].library == '')) {
          this.TransformedMessagesSent.push(this.TransformedMessages[i]);
        }
      }
    }
    //when i click on a folder it will have its id, show only the messages inside
    else {
      for(let i = 0; i < this.TransformedMessages.length; i++) {
        if(!this.TransformedMessages[i].isLibrary && this.TransformedMessages[i].library == id) {
          this.TransformedMessagesSent.push(this.TransformedMessages[i]);
        }
      }
    } 
    console.log(this.TransformedMessagesSent);
  }

  onChange(value: any) : void {
    if(this.CollectedElements.includes(value)) {
      this.CollectedElements = this.CollectedElements.filter((item) => item !== value);
    } else {
      this.CollectedElements.push(value);
    }
    console.log(this.CollectedElements);
  }
  
  //get collected and store transformed  based on collected id = transformed id 
  showCollectedFromTransformed() {
    this.tms.getTransformedCannedMessages(2307475884, '2307475884%3A3250042652855494%3AT2vPmE97qolpOd78wC6vJtxMkCCI7Rd%2B%3Aalphado1')
    .pipe(finalize(() => {
      for(let collected of this.CollectedElements) {
        for(let transformed of this.TransformedMessages) {
          if(collected.id === transformed.id) {
            this.SelectedTransformed.push(transformed);
          }
        }
      }
      this.sendSelectedTransformedMessages();
    }))
    .subscribe((response: any) => {
      this.TransformedMessages = response;
      this.TransformedMessagesSent = this.SelectedTransformed;
    });
  }

  sendSelectedTransformedMessages() {
    this.TransformedMessagesSent = [];
 //if we are in the root, show every folder and message.library==''

      for(let i = 0; i < this.SelectedTransformed.length; i++) {
        if(this.SelectedTransformed[i].isLibrary || (!this.SelectedTransformed[i].isLibrary && this.SelectedTransformed[i].library == '')) {
          this.TransformedMessagesSent.push(this.SelectedTransformed[i]);
        }
      }

    //when i click on a folder it will have its id, show only the messages inside
  
    console.log(this.TransformedMessagesSent);
  }

  isRootTransformation() {
    let parentLibrary = false; 
    if(this.TransformedMessagesSent.length > 0) {
    for(let i = 0; i < this.TransformedMessagesSent.length; i++) {
      if(this.TransformedMessagesSent[i].isLibrary == false && this.TransformedMessagesSent[i].library == "") {
        parentLibrary = true;
        break;
      }
    }
  }
  else {
    parentLibrary = true;
  }
    return parentLibrary;
  }

  isRootLevel() {
    let parentFolder = false;
    for(let i = 0; i < this.MessagesSent.length; i++) {
      if((this.MessagesSent[i].isFolder && this.MessagesSent[i].parentId == "") ||
      (!this.MessagesSent[i].isFolder && this.MessagesSent[i].itemFolderId == "")) {
        parentFolder = true;
        break;
      }
    }
    return parentFolder;
  }

  goBack() {
    let parentIds = [];
    let values = [];
    let parentFolderMessages = [];
    for(let i = 0; i < this.MessagesSent.length; i++) {
      if(this.MessagesSent[i].isFolder) {
        parentIds.push(this.MessagesSent[i].parentId);
      }
      else {
        parentIds.push(this.MessagesSent[i].itemFolderId);
      }
    }
    console.log("parentIds " + parentIds);
    for(let i = 0; i < this.ArrayOfMessages.length; i++) {
      if((this.ArrayOfMessages[i].isFolder && parentIds.includes(this.ArrayOfMessages[i].id)) ||
      (!this.ArrayOfMessages[i].isFolder && parentIds.includes(this.ArrayOfMessages[i].id))) {
         values.push(this.ArrayOfMessages[i]);
      }
    }
    for(let i = 0; i < values.length; i++){
      let valueParentId = values[i].parentId;
      for(let i = 0; i < this.ArrayOfMessages.length; i++) {
        if((this.ArrayOfMessages[i].isFolder && this.ArrayOfMessages[i].parentId == valueParentId) ||
        (!this.ArrayOfMessages[i].isFolder && this.ArrayOfMessages[i].itemFolderId == valueParentId)) {
          parentFolderMessages.push(this.ArrayOfMessages[i]);
        }
      }
    }
    console.log("values " + JSON.stringify(parentFolderMessages));
    this.MessagesSent = parentFolderMessages; 
  }
}
