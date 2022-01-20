import { AppComponent } from './app.component';
import {Router} from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    component = new AppComponent(routerSpy);
  });

  describe('search', () => {
    it('should navigate to / when search term is empty', () => {
      expect(true).toBe(false);
    });

    it('should navigate to /search/xyz when search term is xyz', () => {
      expect(true).toBe(false);
    });
  });
});
