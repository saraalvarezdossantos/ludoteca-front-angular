import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from '../customer.service';
import { Customer } from '../model/customer';


@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  customer : Customer;

  constructor(
    public dialogRef: MatDialogRef<CustomerEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    if (this.data.customer != null) {
      this.customer = this.data.customer;
    }
    else {
      this.customer = new Customer();
    }
  }

  onSave() {
    this.customerService.saveCustomer(this.customer).subscribe(result => {
      this.dialogRef.close();
    });    
  }  

  onClose() {
    this.dialogRef.close();
  }

}
