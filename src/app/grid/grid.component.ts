import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ALL_IN_ONE_TABLE_DEMO_DATA } from './all-in-one-table.demo';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Customer } from './customer.model';
import { of, ReplaySubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit {
  columns: any[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageSize = 15;
  dataSource: MatTableDataSource<any> | null;
  subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  data$: Observable<Customer[]> = this.subject$.asObservable();
  customers: Customer[];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.columns = [
      // { name: 'Checkbox', property: 'checkbox', visible: false },
      { name: 'Image', property: 'image', visible: true },
      { name: 'Name', property: 'name', visible: true, isModelProperty: true },
      { name: 'First Name', property: 'firstName', visible: true, isModelProperty: true },
      { name: 'Last Name', property: 'lastName', visible: true, isModelProperty: true },
      { name: 'Street', property: 'street', visible: true, isModelProperty: true },
      { name: 'Zipcode', property: 'zipcode', visible: true, isModelProperty: true },
      { name: 'City', property: 'city', visible: true, isModelProperty: true },
      // { name: 'Phone', property: 'phoneNumber', visible: false, isModelProperty: true },
      { name: 'Actions', property: 'actions', visible: true },
    ] as any[];
    // this.columns = this.columns.map((column, index) => {
    //   if (column.property === 'checkbox' || column.property === 'phoneNumber') {
    //     column.visible = false;
    //     // this.columns[index] =
    //   }
    //   return column;
    // });

    // this.visibleColumns = this.columns.filter(column => column.visible).map(column => column.property);
    // console.log('this.columns: ', this.columns);

    this.getData().subscribe(customers => {
      // console.log('customers: ', customers);
      this.subject$.next(customers);
    });

    this.dataSource = new MatTableDataSource();
    this.data$
      // .pipe(
      //   filter(Boolean)
      // )
      .subscribe((customers) => {
        // console.log('customers: ', customers);
        this.customers = customers;
        this.dataSource.data = customers;
      });


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  getData() {
    return of(ALL_IN_ONE_TABLE_DEMO_DATA.map(customer => new Customer(customer)));
  }

  toggleColumnVisibility(column, event) {
    // console.log('column: ', column);
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }
}
