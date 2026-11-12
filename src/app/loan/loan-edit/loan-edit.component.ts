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

        this.loan.startDate = new Date(this.loan.startDate as any);
        this.loan.endDate = new Date(this.loan.endDate as any);

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

    /*   onSave(): void {
           console.log('SAVE');
           this.loanService.saveLoan(this.loan).subscribe(() => {
               this.dialogRef.close();
           });
       } */

    onSave(): void {
        if (this.isEndDateBeforeStartDate()) {
            return;
        }

        if (this.isLoanTooLong()) {
            return;
        }

        this.loanService.saveLoan(this.loan).subscribe({
            next: () => {
                this.dialogRef.close();
            },
            error: (error) => {
                alert('No se ha podido guardar el préstamo');
                console.error(error);
            }
        });

    }

    onClose(): void {
        this.dialogRef.close();
    }

    //Para comprobar si la fecha de fin es anterior a la fecha de inicio y mostrar mensaje en el formulairio:

    isEndDateBeforeStartDate(): boolean {

        return this.loan?.startDate != null
            && this.loan?.endDate != null
            && this.loan.endDate < this.loan.startDate;
    }

    isLoanTooLong(): boolean {

        if (!this.loan?.startDate || !this.loan?.endDate) {
            return false;
        }

        const days =
            (this.loan.endDate.getTime() - this.loan.startDate.getTime())
            / (1000 * 60 * 60 * 24);

        return days > 14;
    }
}