import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetDoughnutChartComponent } from './widget-doughnut-chart.component';

describe('WidgetDoughnutChartComponent', () => {
  let component: WidgetDoughnutChartComponent;
  let fixture: ComponentFixture<WidgetDoughnutChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetDoughnutChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetDoughnutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
