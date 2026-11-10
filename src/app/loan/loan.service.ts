import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Loan } from './model/loan';
import { LOAN_DATA } from './model/mock-loans';

@Injectable({
    providedIn: 'root'
})
export class LoanService {

    constructor() { }

    getLoans(
        gameId?: number,
        customerId?: number,
        date?: Date
    ): Observable<Loan[]> {
        return of(LOAN_DATA);
    }

    saveLoan(loan: Loan): Observable<void> {
        return of(void 0);
    }

}

