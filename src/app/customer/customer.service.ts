import { Injectable } from '@angular/core';
import { Customer } from './model/customer';
import { Observable, of } from 'rxjs';
import { CUSTOMER_DATA } from './model/mock.customers';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('http://localhost:8080/customers');
  }

  saveCustomer(customer: Customer): Observable<Customer> {
    let url = 'http://localhost:8080/customers';
        if (customer.id != null) url += '/'+customer.id;

        return this.http.put<Customer>(url, customer);
  }

  deleteCustomer(idCustomer : number): Observable<any> {
    return this.http.delete('http://localhost:8080/customers/' + idCustomer);
  }  

}
