import type { ExperimentConfig } from '../index'

export const experimentA: ExperimentConfig = {
  id: 'A',
  badge: 'Experiment A',
  headline: 'Play stronger with less friction',
  subhead: 'Unlock every premium tool in one adaptive membership flow.',
  cta: 'Start free trial',
  features: [
    {
      title: 'Unlimited puzzles',
      detail: 'Train every day without session limits.',
    },
    {
      title: 'Full game review',
      detail: 'Get immediate post-game insights and mistakes explained.',
    },
    {
      title: 'No ads',
      detail: 'Keep the board focused with an uninterrupted experience.',
    },
  ],
  plans: [
    {
      id: 'monthly',
      label: 'Monthly',
      price: '$12.99',
      cadence: '/mo',
    },
    {
      id: 'yearly',
      label: 'Yearly',
      price: '$89.99',
      cadence: '/yr',
      highlighted: true,
    },
  ],
}
