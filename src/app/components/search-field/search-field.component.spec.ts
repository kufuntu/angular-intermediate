import { SearchFieldComponent } from './search-field.component';
import { fakeAsync, tick } from '@angular/core/testing';

describe('SearchFieldComponent', () => {
  let component: SearchFieldComponent;
  let emittedSearchTerm: string;
  let emittedSearchTermCounter: number;

  beforeEach(() => {
    component = new SearchFieldComponent();
    component.ngOnInit();

    subscribeToSearchTerm();
  });

  describe('onInput', () => {
    const searchTerm = 'xyz';

    it('should emit the search term after 500ms', fakeAsync(() => {
      onInput(searchTerm);
      tick(500);
      expect(emittedSearchTerm).toBe(searchTerm, 'emittedSearchTerm should be the given input after 500 ms');
    }));

    it('should only emit search term when distinct from previous one', fakeAsync(() => {
      onInput('x');
      tick(500);

      onInput('');
      onInput('x');
      tick(500);

      expect(emittedSearchTerm).toBe('x');
      expect(emittedSearchTermCounter).toBe(1);
    }));
  });

  describe('onEnter', () => {
    it('should emit the search term immediately', () => {
      const searchTerm = 'xyz';
      onInput(searchTerm);

      component.onEnter(null);

      expect(emittedSearchTerm).toBe(searchTerm);
    });
  });

  function subscribeToSearchTerm() {
    emittedSearchTermCounter = 0;
    component.searchTerm.subscribe((value) => {
      emittedSearchTerm = value;
      emittedSearchTermCounter++;
    });
  }

  function onInput(searchTerm: string) {
    const htmlInputEvent = { value: searchTerm };
    const event = { target: htmlInputEvent } as any;
    component.onInput(event);
  }
});
