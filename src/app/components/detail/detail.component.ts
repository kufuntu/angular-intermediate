import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { ContactService } from '../../services/contact.service';
import { User } from "../../types/user";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent {
  
  user$: Observable<User> = this.activatedRoute.params.pipe(
    map(params => params.id),
    switchMap(id => this.contactService.getContact(id)),
    switchMap(user => this.contactService.getContactInterests(user.id).pipe(
      map(interests => {
        return { ...user, interests };
      })
    ))
  );

  user2$: Observable<User> = this.activatedRoute.params.pipe(
    map(params => params.id),
    switchMap(id => this.contactService.getContact(id).pipe(
      withLatestFrom(this.contactService.getContactInterests(id))
    )),
    map(([user, interests]) => {
      return { ...user, interests };
    })
  );

  user3$: Observable<User> = this.activatedRoute.params.pipe(
    map(params => params.id),
    switchMap(id => combineLatest([
      this.contactService.getContact(id),
      this.contactService.getContactInterests(id)
    ])),
    map(([user, interests]) => {
      return { ...user, interests };
    })
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService
    ) {

    }
}
