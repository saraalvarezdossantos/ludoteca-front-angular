import { Injectable } from '@angular/core';
import { Customer } from './model/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  getCustomers(): Observable<Customer[]> {
    return of(null);  //¡Revisar cuando se conecte backend!
  }

  saveCustomer(customer: Customer): Observable<Customer> {
    return of(null);
  }

  deleteCustomer(idCustomer : number): Observable<any> {
    return of(null);
  }  

}
