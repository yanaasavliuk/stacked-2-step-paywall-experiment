import type { ExperimentConfig } from '../index'

export const experimentB: ExperimentConfig = {
  id: 'B',
  badge: 'Experiment B',
  headline: 'Make every move with confidence',
  subhead: 'A value-forward membership pitch with the same adaptive layout.',
  cta: 'Choose your plan',
  features: [
    {
      title: 'Unlimited lessons',
      detail: 'Progress through guided courses at your own pace.',
    },
    {
      title: 'Advanced analysis',
      detail: 'Dive deeper into evaluations and move recommendations.',
    },
    {
      title: 'Premium bot challenges',
      detail: 'Practice against stronger and themed personalities.',
    },
  ],
  plans: [
    {
      id: 'monthly',
      label: 'Monthly',
      price: '$13.99',
      cadence: '/mo',
    },
    {
      id: 'yearly',
      label: 'Yearly',
      price: '$94.99',
      cadence: '/yr',
      highlighted: true,
    },
  ],
}
