import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private readonly testData = ['Anna', 'Bert', 'Chris'];

  getUsers(): Observable<string> {
    return interval(1000).pipe(
      take(this.testData.length),
      map(i => this.testData[i])
    );
  }
}
