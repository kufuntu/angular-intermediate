import { ContactService } from './contact.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

describe('ContactService', () => {
  let service: ContactService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ContactService(httpClientSpy);
  });

  describe('getContactList', () => {
    it('should send a get request to /contact/list', () => {
      pending();
    });

    it('should send the search term in the http params', () => {
      pending();
    });

    it('should send the search term in the http params even when null', () => {
      pending();
    });
  });

});
