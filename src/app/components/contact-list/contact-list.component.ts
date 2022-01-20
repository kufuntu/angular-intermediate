import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { User } from '../../types/user';
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
    this.getContactList().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  getContactList() {
    return this.activeRoute.params.pipe(
      mergeMap(params => this.contactService.getContactList(params.term || ''))
    );
  }

}
