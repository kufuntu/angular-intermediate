import { SearchFieldComponent } from './search-field.component';

describe('SearchFieldComponent', () => {
  let component: SearchFieldComponent;

  beforeEach(() => {
    component = new SearchFieldComponent();
    component.ngOnInit();
  });

  describe('onInput', () => {
    const searchTerm = 'xyz';

    it('should emit the search term after 500ms', () => {
      pending();
    });

    it('should only emit search term when distinct from previous one', () => {
      pending();
    });
  });

  describe('onEnter', () => {
    it('should emit the search term immediately', () => {
      pending();
    });
  });

  function onInput(searchTerm: string) {
    const htmlInputEvent = { value: searchTerm };
    const event = { target: htmlInputEvent } as any;
    component.onInput(event);
  }
});
