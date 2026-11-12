
import { Game } from "src/app/game/model/Game";
import { Customer } from "../../customer/model/customer";

export class Loan {
  id: number;
  game: Game;
  customer: Customer;
  startDate: Date;
  endDate: Date;
}