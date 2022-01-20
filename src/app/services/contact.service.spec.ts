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
      service.getContactList(null);

      expect(httpClientSpy.get).toHaveBeenCalledWith(environment.api + '/contact/list', jasmine.any(Object));
    });

    it('should send the search term in the http params', () => {
      expect(true).toBe(false);
    });

    it('should send the search term in the http params even when null', () => {
      expect(true).toBe(false);
    });
  });

});
