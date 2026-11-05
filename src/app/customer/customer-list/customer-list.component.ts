import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../model/customer';
import { CustomerService } from '../customer.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  dataSource = new MatTableDataSource<Customer>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(private customerService: CustomerService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(customers => {
      this.dataSource.data = customers;
    });

  }

  createCustomer() {    
       const dialogRef = this.dialog.open(CustomerEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });  

    }

}

