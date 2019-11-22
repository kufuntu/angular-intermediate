import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CaseStudy';

  constructor(private router: Router) {

  }

  search($event: string) {
    if ($event) {
      this.router.navigateByUrl('/search/' + $event);
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
