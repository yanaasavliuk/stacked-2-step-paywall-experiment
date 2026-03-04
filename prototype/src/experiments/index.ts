import { experimentA } from './experimentA/config'
import { experimentB } from './experimentB/config'

export type ExperimentId = 'A' | 'B'
export type PlanTier = 'gold' | 'platinum' | 'diamond'

export interface ExperimentFeature {
  title: string
  availability: Record<PlanTier, boolean>
}

export interface ExperimentPlan {
  id: PlanTier
  label: string
  icon: string
  highlighted?: boolean
}

export interface ExperimentConfig {
  id: ExperimentId
  badge: string
  headline: string
  subhead: string
  legalLine: string
  primaryPrice: string
  primaryPriceDetail: string
  cta: string
  features: ExperimentFeature[]
  plans: ExperimentPlan[]
}

const experiments: Record<ExperimentId, ExperimentConfig> = {
  A: experimentA,
  B: experimentB,
}

export function getExperimentById(id: ExperimentId): ExperimentConfig {
  return experiments[id]
}
