import {DetailComponent} from './detail.component';
import {ContactService} from '../../services/contact.service';
import {of, Subject} from 'rxjs';
import {User} from '../../types/user';
import {ActivatedRoute, Params} from '@angular/router';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let contactServiceSpy: jasmine.SpyObj<ContactService>;
  let activeRouteSpy: ActivatedRoute;

  beforeEach(() => {
    contactServiceSpy = jasmine.createSpyObj('ContactService', ['getContact', 'getContactInterests']);

    activeRouteSpy = { } as ActivatedRoute;
    activeRouteSpy.params = new Subject<Params>();

    component = new DetailComponent(contactServiceSpy, activeRouteSpy);
  });

  describe('onInit', () => {
    let userData: User;

    beforeEach(() => {
      contactServiceSpy.getContact.and.callFake((userId) => of({ id: userId } as User));
      contactServiceSpy.getContactInterests.and.callFake((userId) => of([ 'a_' + userId, 'b_' + userId ]));
      component.ngOnInit();

      component.getUser().subscribe(user => {
        userData = user;
      }, () => {
        userData = null;
      });
    });

    it('should initialize the user', () => {
      (activeRouteSpy.params as Subject<Params>).next({ id: 'USER1' });

      expect(userData).toEqual({ id: 'USER1', interests: [ 'a_USER1', 'b_USER1' ] } as User);
    });

    describe('when route params change', () => {
      beforeEach(() => {
        (activeRouteSpy.params as Subject<Params>).next({ id: 'USER1' });
      });

      it('should update the user', () => {
        (activeRouteSpy.params as Subject<Params>).next({ id: 'USER2' });

        expect(userData).toEqual({ id: 'USER2', interests: [ 'a_USER2', 'b_USER2' ] } as User);
      });
    });
  });
});
