import { ContactListComponent } from './contact-list.component';
import {ContactService} from '../../services/contact.service';
import {of, Subject} from 'rxjs';
import {User} from '../../types/user';
import {ActivatedRoute, Params} from '@angular/router';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let contactServiceSpy: jasmine.SpyObj<ContactService>;
  let activeRouteSpy: ActivatedRoute;

  beforeEach(() => {
    contactServiceSpy = jasmine.createSpyObj('ContactService', ['getContactList']);

    activeRouteSpy = { } as ActivatedRoute;
    activeRouteSpy.params = new Subject<Params>();

    component = new ContactListComponent(contactServiceSpy, activeRouteSpy);
  });

  describe('onInit', () => {
    let userIds: string[];

    beforeEach(() => {
      contactServiceSpy.getContactList.and.callFake((searchTerm) => {
        return of([ { id: 'USER_' + searchTerm } as User ]);
      });
      component.ngOnInit();

      component.getContactList().subscribe((userList) => {
        userIds = userList.map(user => user.id);
      }, () => {
        userIds = null;
      });
    });

    it('should initialize the contacts', () => {
      (activeRouteSpy.params as Subject<Params>).next({ term: 'x' });

      expect(userIds.length).toBe(1);
      expect(userIds[0]).toBe('USER_x');
    });
  });
});
