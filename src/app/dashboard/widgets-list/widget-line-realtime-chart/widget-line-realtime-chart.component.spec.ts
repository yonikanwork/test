import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetLineRealtimeChartComponent } from './widget-line-realtime-chart.component';

describe('WidgetLineRealtimeChartComponent', () => {
  let component: WidgetLineRealtimeChartComponent;
  let fixture: ComponentFixture<WidgetLineRealtimeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetLineRealtimeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetLineRealtimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
