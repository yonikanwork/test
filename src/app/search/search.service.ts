import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  baseUrl = 'https://api.cdnjs.com/libraries';
  queryUrl = '?search=';

  constructor(private http: HttpClient) {}

  search(terms: Observable<string>) {
    return terms
      .pipe(
        // tap(term => console.log(term)),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(term => this.searchEntries(term))
      );
  }

  searchEntries(term) {
    return this.http.get(this.baseUrl + this.queryUrl + term);
  }
}
