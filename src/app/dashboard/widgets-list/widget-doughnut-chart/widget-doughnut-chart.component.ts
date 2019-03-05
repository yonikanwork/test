import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-widget-doughnut-chart',
  templateUrl: './widget-doughnut-chart.component.html',
  styleUrls: ['./widget-doughnut-chart.component.scss']
})
export class WidgetDoughnutChartComponent implements OnInit {
  @Input() widgetData: any;

  public doughnutChartType = 'doughnut';
  public doughnutChartColors: Array<any> = [
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

  // public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartLabels;
  public doughnutChartData;

  constructor() { }

  ngOnInit() {
    this.doughnutChartLabels = this.widgetData.labels;
    this.doughnutChartData = this.widgetData.data;
  }
}
