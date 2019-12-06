import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { User } from '../../types/user';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: User[];

  constructor(
    private contactService: ContactService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.params.pipe(
      mergeMap(params => this.contactService.getContactList(params.term || ''))
    ).subscribe(contacts => {
      this.contacts = contacts;
    });
  }

}
