import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoanService } from '../loan.service';
import { Loan } from '../model/loan';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/Game';
import { CustomerService } from 'src/app/customer/customer.service';
import { Customer } from 'src/app/customer/model/customer';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';

@Component({
    selector: 'app-loan-list',
    templateUrl: './loan-list.component.html',
    styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {
   displayedColumns: string[] = [
        'game',
        'customer',
        'startDate',
        'endDate'
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
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void {

        this.loanService.getLoans().subscribe(
            loans => this.loans = loans
        );

        this.gameService.getGames().subscribe(
            games => this.games = games
        );

        this.customerService.getCustomers().subscribe(
            customers => this.customers = customers
        );
    }

    onCleanFilter(): void {

        this.filterGame = null;
        this.filterCustomer = null;
        this.filterDate = null;

        this.onSearch();
    }

    onSearch(): void {

        let gameId = this.filterGame != null ? this.filterGame.id : null;
        let customerId = this.filterCustomer != null ? this.filterCustomer.id : null;
        let date = this.filterDate;

        this.loanService.getLoans(gameId, customerId, date).subscribe(
            loans => this.loans = loans
        );
    }

    createLoan() {
        const dialogRef = this.dialog.open(LoanEditComponent, {
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }

    editLoan(loan: Loan) {
        const dialogRef = this.dialog.open(LoanEditComponent, {
            data: { loan: loan }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.onSearch();
        });
    }
}
