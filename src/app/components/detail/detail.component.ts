import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { ContactService } from '../../services/contact.service';
import { User } from '../../types/user';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  user: User;

  constructor(
    private contactService: ContactService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getUser().subscribe(user => {
      this.user = user;
    });
  }

  getUser() {
    return this.activeRoute.params.pipe(
      mergeMap(route => this.contactService.getContact(route.id)),
      mergeMap(user => this.contactService.getContactInterests(user.id).pipe(
        map(interests => ({ ...user, interests }))
      ))
    );
  }

}
