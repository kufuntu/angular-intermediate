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

      component.contacts$.subscribe((userList) => {
        userIds = userList.map(user => user.id);
      }, () => {
        userIds = null;
      });
    });

    it('should get the contact list', () => {
      (activeRouteSpy.params as Subject<Params>).next({ term: 'x' });

      expect(contactServiceSpy.getContactList).toHaveBeenCalledWith('x');
    });

    it('should have contacts', () => {
      (activeRouteSpy.params as Subject<Params>).next({ term: 'x' });

      expect(userIds.length).toBe(1);
      expect(userIds[0]).toBe('USER_x');
    });

    describe('when params change', () => {
      beforeEach(() => {
        (activeRouteSpy.params as Subject<Params>).next({ term: 'x' });
      });

      it('should update user data', () => {
        (activeRouteSpy.params as Subject<Params>).next({ term: 'y' });

        expect(userIds.length).toBe(1);
        expect(userIds[0]).toBe('USER_y');
      });
    });
  });
});
