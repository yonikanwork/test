import { Component, OnInit, Input } from '@angular/core';
import { WidgetsService } from '../../widgets.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  @Input() widgetData: any;
  isLoading = false;

  //  for the isListViewMode widget mode
  isListViewMode = false;
  tableData = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'}
  ];
  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;

  constructor(public widgetsService: WidgetsService) {}

  ngOnInit() {
    // console.log('this.widgetData: ', this.widgetData);
  }

  onRefresh() {
    this.isLoading = true;
    setTimeout(() => { this.onRefreshOriginal(); }, 2000);
  }

  onRefreshOriginal() {
    this.widgetsService.getWidget(this.widgetData.id)
      .subscribe((widget) => {
        this.isLoading = false;
        this.widgetData = widget;
      });
  }

  toggleListView() {
    this.isListViewMode = !this.isListViewMode;
  }
}
