import { Injectable } from '@angular/core';
import { Customer } from './model/customer';
import { Observable, of } from 'rxjs';
import { CUSTOMER_DATA } from './model/mock.customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  getCustomers(): Observable<Customer[]> {
    return of(CUSTOMER_DATA);  //¡Revisar cuando se conecte backend!
  }

  saveCustomer(customer: Customer): Observable<Customer> {
    return of(null);
  }

  deleteCustomer(idCustomer : number): Observable<any> {
    return of(null);
  }  

}
