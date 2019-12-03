import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit, OnDestroy {

  @Output() searchTerm = new EventEmitter<string>();
  private searchAsYouType = new Subject<string>();
  private textValue: string;
  private searchAsYouTypeSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.searchAsYouTypeSubscription = this.searchAsYouType.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((newValue) => {
      this.searchTerm.emit(newValue);
    });
  }

  ngOnDestroy() {
    if (this.searchAsYouTypeSubscription) {
      this.searchAsYouTypeSubscription.unsubscribe();
    }
  }

  onEnter(event: KeyboardEvent) {
    this.searchTerm.emit(this.textValue);
  }

  onInput(e: Event) {
    this.textValue = (e.target as HTMLInputElement).value;
    this.searchAsYouType.next(this.textValue);
  }

}
