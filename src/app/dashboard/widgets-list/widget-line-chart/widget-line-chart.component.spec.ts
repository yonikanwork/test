import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetLineChartComponent } from './widget-line-chart.component';

describe('WidgetLineChartComponent', () => {
  let component: WidgetLineChartComponent;
  let fixture: ComponentFixture<WidgetLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
