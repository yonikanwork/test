import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-widget-bar-chart',
  templateUrl: './widget-bar-chart.component.html',
  styleUrls: ['./widget-bar-chart.component.scss']
})
export class WidgetBarChartComponent implements OnInit {
  @Input() widgetData: any;
  // isLoading = false;
  // widgetData;
  // private widgetId: string;

  public barChartType = 'bar';
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLegend = true;
  public barChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public barChartLabels;
  public barChartData;

  constructor() { }

  ngOnInit() {
    this.barChartLabels = this.widgetData.labels;
    this.barChartData = this.widgetData.data;

    // this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    // this.barChartData = [
    //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    //   {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    // ];
    // console.log('widgetData: ', this.widgetData);

    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has('widgetId')) {
    //     this.widgetId = paramMap.get('widgetId');
    //     this.isLoading = true;
    //     this.widgetsService.getWidget(this.widgetId).subscribe(widgetData => {
    //       console.log('widgetData: ', widgetData);
    //       this.isLoading = false;
    //       this.widgetData = widgetData;
    //     });
    //   } else {
    //     this.widgetId = null;
    //     console.log('this.widgetId: ', this.widgetId);
    //   }
    // });
  }
}
