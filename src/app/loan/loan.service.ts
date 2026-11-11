import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Loan } from './model/loan';
import { LOAN_DATA } from './model/mock-loans';
import { LoanPage } from './model/loan-page';
import { Pageable } from '../core/model/page/Pageable';
import { LOAN_DATA_LIST } from './model/mock-loans-list';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class LoanService {

    constructor(private http: HttpClient) { }

    getLoans(
        gameId?: number,
        customerId?: number,
        date?: Date
    ): Observable<Loan[]> {
        return of(LOAN_DATA);
    }

    saveLoan(loan: Loan): Observable<void> {
        let url = 'http://localhost:8080/loan';

        if (loan.id != null) {
            url += '/' + loan.id;
        }
        return this.http.put<void>(url, loan);
    }

    getLoanPage(pageable: Pageable): Observable<LoanPage> {
        return this.http.post<LoanPage>(
            'http://localhost:8080/loan',
            { pageable: pageable }
        );
    }

    deleteLoan(loanId: number): Observable<void> {
        return this.http.delete<void>(
            'http://localhost:8080/loan/' + loanId
        );
    }   

}

