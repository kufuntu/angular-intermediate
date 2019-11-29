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

  data$: Observable<User>;

  constructor(
    private activeRoute: ActivatedRoute,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.data$ = this.activeRoute.params.pipe(
      mergeMap(route => this.contactService.getContact(route.id)),
      mergeMap(user => this.contactService.getContactInterests(user.id).pipe(
        map(interests => ({ ...user, interests }))
      ))
    );
  }

}
