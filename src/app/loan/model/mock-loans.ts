import { Loan } from './loan';

export const LOAN_DATA: Loan[] = [
  {
    id: 1,
    game: { id: 1, title: 'Catan' } as any,
    customer: { id: 1, name: 'Sara' } as any,
    startDate: new Date('2026-11-01'),
    endDate: new Date('2026-11-10')
  },
  {
    id: 2,
    game: { id: 2, title: 'Carcassonne' } as any,
    customer: { id: 2, name: 'Pepe' } as any,
    startDate: new Date('2026-11-03'),
    endDate: new Date('2026-11-12')
  },
  {
    id: 3,
    game: { id: 3, title: 'Pandemic' } as any,
    customer: { id: 1, name: 'Sara' } as any,
    startDate: new Date('2026-11-05'),
    endDate: new Date('2026-11-14')
  },
  {
    id: 4,
    game: { id: 4, title: 'Terraforming Mars' } as any,
    customer: { id: 3, name: 'Xavier' } as any,
    startDate: new Date('2026-11-07'),
    endDate: new Date('2026-11-16')
  },
  {
    id: 5,
    game: { id: 5, title: '7 Wonders' } as any,
    customer: { id: 2, name: 'Pepe' } as any,
    startDate: new Date('2026-11-08'),
    endDate: new Date('2026-11-17')
  },
  {
    id: 6,
    game: { id: 6, title: 'Azul' } as any,
    customer: { id: 4, name: 'Aida' } as any,
    startDate: new Date('2026-11-10'),
    endDate: new Date('2026-11-19')
  }
];