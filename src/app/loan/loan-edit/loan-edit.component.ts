import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Loan } from '../model/loan';
import { LoanService } from '../loan.service';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/Game';
import { CustomerService } from 'src/app/customer/customer.service';
import { Customer } from 'src/app/customer/model/customer';

@Component({
    selector: 'app-loan-edit',
    templateUrl: './loan-edit.component.html',
    styleUrls: ['./loan-edit.component.scss']
})
export class LoanEditComponent implements OnInit {

    loan: Loan;
    games: Game[];
    customers: Customer[];

    constructor(
        public dialogRef: MatDialogRef<LoanEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private loanService: LoanService,
        private gameService: GameService,
        private customerService: CustomerService
    ) { }

    ngOnInit(): void {

        if (this.data.loan != null) {
            this.loan = Object.assign({}, this.data.loan);
        } else {
            this.loan = new Loan();
        }

        this.gameService.getGames().subscribe(
            games => {
                this.games = games;

                if (this.loan.game != null) {
                    let gameFilter: Game[] = games.filter(
                        game => game.id == this.loan.game.id
                    );

                    if (gameFilter.length > 0) {
                        this.loan.game = gameFilter[0];
                    }
                }
            }
        );

        this.customerService.getCustomers().subscribe(
            customers => {
                this.customers = customers;

                if (this.loan.customer != null) {
                    let customerFilter: Customer[] = customers.filter(
                        customer => customer.id == this.loan.customer.id
                    );

                    if (customerFilter.length > 0) {
                        this.loan.customer = customerFilter[0];
                    }
                }
            }
        );
    }

    onSave(): void {

        this.loanService.saveLoan(this.loan).subscribe(() => {
            this.dialogRef.close();
        });
    }

    onClose(): void {
        this.dialogRef.close();
    }
}