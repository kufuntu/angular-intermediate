import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {ContactService} from '../../services/contact.service';
import {of} from 'rxjs';
import {User} from '../../types/user';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let contactServiceSpy: jasmine.SpyObj<ContactService>;

  beforeEach(waitForAsync(() => {
    contactServiceSpy = jasmine.createSpyObj('ContactService', ['getContact', 'getContactInterests']);

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ DetailComponent ],
      providers: [
        { provide: ContactService, useValue: contactServiceSpy }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    contactServiceSpy.getContact.and.returnValue(of({ id: 'USER1' } as User));
    contactServiceSpy.getContactInterests.and.returnValue(of([]));

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
