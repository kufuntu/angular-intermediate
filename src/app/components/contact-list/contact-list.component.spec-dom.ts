import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContactListComponent } from './contact-list.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ContactService} from '../../services/contact.service';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {User} from '../../types/user';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let contactServiceSpy: jasmine.SpyObj<ContactService>;

  beforeEach(waitForAsync(() => {
    contactServiceSpy = jasmine.createSpyObj('ContactService', ['getContactList']);

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ ContactListComponent ],
      providers: [
        { provide: ContactService, useValue: contactServiceSpy }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    contactServiceSpy.getContactList.and.returnValue(of([{ id: 'USER1' } as User]));

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
