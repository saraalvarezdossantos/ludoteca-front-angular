import { Loan } from "./loan";
import { GAME_DATA } from "src/app/game/model/mock-games";
import { CUSTOMER_DATA } from "src/app/customer/model/mock.customers";

export const LOAN_DATA_LIST: Loan[] = [
    {
        id: 1,
        game: GAME_DATA[0],
        customer: CUSTOMER_DATA[0],
        startDate: new Date('2026-11-01'),
        endDate: new Date('2026-11-10')
    },
    {
        id: 2,
        game: GAME_DATA[1],
        customer: CUSTOMER_DATA[1],
        startDate: new Date('2026-11-03'),
        endDate: new Date('2026-11-12')
    },
    {
        id: 3,
        game: GAME_DATA[2],
        customer: CUSTOMER_DATA[2],
        startDate: new Date('2026-11-05'),
        endDate: new Date('2026-11-14')
    },
    {
        id: 4,
        game: GAME_DATA[3],
        customer: CUSTOMER_DATA[3],
        startDate: new Date('2026-11-07'),
        endDate: new Date('2026-11-16')
    },
    {
        id: 5,
        game: GAME_DATA[4],
        customer: CUSTOMER_DATA[4],
        startDate: new Date('2026-11-08'),
        endDate: new Date('2026-11-17')
    },
    {
        id: 6,
        game: GAME_DATA[5],
        customer: CUSTOMER_DATA[5],
        startDate: new Date('2026-11-10'),
        endDate: new Date('2026-11-19')
    }
];
