import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { UIService } from '../shared/ui.service';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + '/widgets';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {
  private widgets = [];
  private widgetsUpdated = new Subject<any[]>();
  private widget;


  constructor(private http: HttpClient, private router: Router, private uiService: UIService) {}

  getWidgetsUpdateListener() {
    return this.widgetsUpdated.asObservable();
  }

  getWidgets() {
    this.http.get<any[]>(BACKEND_URL)
      .subscribe((fetchedWidgets: any) => {
        this.widgets = fetchedWidgets.widgets;
        this.widgetsUpdated.next([...this.widgets]);
      });
  }

  getWidget(id: number) {
    return this.http.get<any>(BACKEND_URL + '/' + id)
              .pipe(
                map((fetchedWidget) => fetchedWidget.widget)
              );
  }
}
