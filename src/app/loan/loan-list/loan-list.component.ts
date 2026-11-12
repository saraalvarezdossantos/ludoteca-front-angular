import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { LoanService } from '../loan.service';
import { Loan } from '../model/loan';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';

import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/Game';

import { CustomerService } from 'src/app/customer/customer.service';
import { Customer } from 'src/app/customer/model/customer';

import { Pageable } from 'src/app/core/model/page/Pageable';

@Component({
    selector: 'app-loan-list',
    templateUrl: './loan-list.component.html',
    styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {

    pageNumber: number = 0;
    pageSize: number = 5;
    totalElements: number = 0;

    dataSource = new MatTableDataSource<Loan>();

    displayedColumns: string[] = [
        'id',
        'game',
        'customer',
        'startDate',
        'endDate',
        'action'
    ];

    loans: Loan[];

    games: Game[];
    customers: Customer[];

    filterGame: Game;
    filterCustomer: Customer;
    filterDate: Date;

    constructor(
        private loanService: LoanService,
        private gameService: GameService,
        private customerService: CustomerService,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {

        this.loadPage();

        this.gameService.getGames().subscribe(
            games => this.games = games
        );

        this.customerService.getCustomers().subscribe(
            customers => this.customers = customers
        );
    }

    loadPage(event?: PageEvent): void {

        let pageable: Pageable = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [{
                property: 'id',
                direction: 'ASC'
            }]
        };

        if (event != null) {
            pageable.pageNumber = event.pageIndex;
            pageable.pageSize = event.pageSize;
        }

        this.loanService.getLoanPage(pageable).subscribe(data => {
            this.dataSource.data = data.content;
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
        });
    }

    onCleanFilter(): void {

        this.filterGame = null;
        this.filterCustomer = null;
        this.filterDate = null;

        this.onSearch();
    }

    onSearch(): void {
        console.log('FILTRAR');


    let gameId =
        this.filterGame != null ? this.filterGame.id : null;

    let customerId =
        this.filterCustomer != null ? this.filterCustomer.id : null;

    let date = this.filterDate;

    this.loanService
        .getLoans(gameId, customerId, date)
        .subscribe(page => {

            this.dataSource.data = page.content;
            this.totalElements = page.totalElements;
            this.pageNumber = page.pageable.pageNumber;
            this.pageSize = page.pageable.pageSize;
        });
}

    createLoan(): void {

        const dialogRef = this.dialog.open(LoanEditComponent, {
            data: {}
        });

        dialogRef.afterClosed().subscribe(() => {
            this.loadPage();
        });
    }

    editLoan(loan: Loan): void {

        const dialogRef = this.dialog.open(LoanEditComponent, {
            data: { loan: loan }
        });

        dialogRef.afterClosed().subscribe(() => {
            this.loadPage();
        });
    }

    deleteLoan(loan: Loan): void {
        this.loanService.deleteLoan(loan.id).subscribe(() => {
            this.loadPage();
        });
    }
}