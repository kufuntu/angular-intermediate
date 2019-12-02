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
      const searchTerm = 'xyz';

      service.getContactList(searchTerm);

      expect(httpClientSpy.get).toHaveBeenCalledWith(jasmine.any(String), { params: { term: searchTerm } });
    });

    it('should send the search term in the http params even when null', () => {
      service.getContactList(null);

      expect(httpClientSpy.get).toHaveBeenCalledWith(environment.api + '/contact/list', { params: { term: null } });
    });
  });

  describe('getContact', () => {
    it('should send a get request to /contact/123 when user id is "123"', () => {
      const userId = '123';

      service.getContact(userId);

      expect(httpClientSpy.get).toHaveBeenCalledWith(environment.api + '/contact/' + userId);
    });
  });

  describe('getContactInterests', () => {
    it('should send a get request to /contact/123/interests when user id is "123"', () => {
      const userId = '123';

      service.getContactInterests(userId);

      expect(httpClientSpy.get).toHaveBeenCalledWith(environment.api + '/contact/' + userId + '/interests');
    });
  });
});
