import { Component, OnInit } from '@angular/core';
import { WidgetsService } from '../widgets.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-widgets-list',
  templateUrl: './widgets-list.component.html',
  styleUrls: ['./widgets-list.component.scss']
})
export class WidgetsListComponent implements OnInit {
  widgets: any[] = [];
  isLoading = true;

  widget1: Observable<any>;
  widget2: Observable<any>;
  widget3: Observable<any>;
  widget4: Observable<any>;
  widgetList: any[];

  constructor(public widgetsService: WidgetsService) {}

  ngOnInit() {
    this.isLoading = true;

    this.widget1 = this.widgetsService.getWidget(1);
    this.widget2 = this.widgetsService.getWidget(2);
    this.widget3 = this.widgetsService.getWidget(3);
    this.widget4 = this.widgetsService.getWidget(4);


    forkJoin([this.widget1, this.widget2, this.widget3, this.widget4])
      .subscribe(fetchedWidgets => {
        this.isLoading = false;
        this.widgets = fetchedWidgets;
      });
  }
}
