import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Loan } from './model/loan';
import { LOAN_DATA } from './model/mock-loans';
import { LoanPage } from './model/loan-page';
import { Pageable } from '../core/model/page/Pageable';
import { LOAN_DATA_LIST } from './model/mock-loans-list';


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

    getLoanPage(pageable: Pageable): Observable<LoanPage> {
       const start = pageable.pageNumber * pageable.pageSize;
        const end = start + pageable.pageSize;

        return of({
            content: LOAN_DATA_LIST.slice(start, end),
            pageable: pageable,
            totalElements: LOAN_DATA_LIST.length
        });
    }

}

