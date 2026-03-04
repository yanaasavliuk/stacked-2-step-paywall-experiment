import type { ExperimentConfig } from '../index'

export const experimentB: ExperimentConfig = {
  id: 'B',
  badge: 'Experiment B',
  headline: 'Make every move with confidence',
  subhead: 'Choose a plan for after your 7-day free trial',
  legalLine: '$17.99/mo after 7 days',
  primaryPrice: '$11.00 / month',
  primaryPriceDetail: 'billed annually, $129.99 / year',
  cta: 'Try for $0.00',
  features: [
    {
      title: 'Puzzles',
      availability: { gold: true, platinum: true, diamond: true },
    },
    {
      title: 'Lessons',
      availability: { gold: true, platinum: true, diamond: true },
    },
    {
      title: 'Bots',
      availability: { gold: true, platinum: true, diamond: true },
    },
    {
      title: 'Play Coach',
      availability: { gold: true, platinum: true, diamond: true },
    },
    {
      title: 'No Ads',
      availability: { gold: true, platinum: true, diamond: true },
    },
    {
      title: 'Game Review',
      availability: { gold: true, platinum: true, diamond: true },
    },
    {
      title: 'Move Explanations',
      availability: { gold: false, platinum: true, diamond: true },
    },
    {
      title: 'Insights',
      availability: { gold: false, platinum: true, diamond: true },
    },
  ],
  plans: [
    {
      id: 'gold',
      label: 'Gold',
      icon: '⭐',
    },
    {
      id: 'platinum',
      label: 'Platinum',
      icon: '👑',
    },
    {
      id: 'diamond',
      label: 'Diamond',
      icon: '💎',
      highlighted: true,
    },
  ],
}
