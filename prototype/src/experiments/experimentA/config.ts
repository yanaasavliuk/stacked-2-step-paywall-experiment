import type { ExperimentConfig } from '../index'

export const experimentA: ExperimentConfig = {
  id: 'A',
  badge: 'Experiment A',
  headline: 'Play stronger with less friction',
  subhead: 'Choose a plan for after your 7-day free trial',
  legalLine: '$16.99/mo after 7 days',
  primaryPrice: '$10.00 / month',
  primaryPriceDetail: 'billed annually, $119.99 / year',
  cta: 'Start free trial',
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
      availability: { gold: false, platinum: true, diamond: true },
    },
    {
      title: 'Move Explanations',
      availability: { gold: false, platinum: false, diamond: true },
    },
    {
      title: 'Insights',
      availability: { gold: false, platinum: false, diamond: true },
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
