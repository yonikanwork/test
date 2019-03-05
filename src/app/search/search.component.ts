import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchService } from './search.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  results: any;
  searchTerm$ = new Subject<string>();

  isLoading = false;


  constructor(private searchService: SearchService) {

  }

  ngOnInit() {
    this.searchService.search(this.searchTerm$)
      .pipe(
        tap(result => {
          this.isLoading = true;
          console.log(this.isLoading);
        })
      )
      .subscribe(results => {
        console.log(results);
        this.results = results;
        // this.isLoading = false;
      });
    // this.isLoading = false;


  }
}
