import { cold, hot } from 'jasmine-marbles';
import { TestService } from './test.service';

describe('TestService', () => {
  let service: TestService;

  beforeEach(() => {
    service = new TestService();
  });

  describe('getUsers', () => {
    fit('should match a-b-c', () => {
      const myObs$ = cold('a-b-c', { a: 'Anna', b: 'Bert', c: 'Chris' });
      myObs$.subscribe(data => console.log(data));
    });
  });

});
