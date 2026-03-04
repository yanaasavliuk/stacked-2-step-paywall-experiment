import { experimentA } from './experimentA/config'
import { experimentB } from './experimentB/config'

export type ExperimentId = 'A' | 'B'

export interface ExperimentFeature {
  title: string
  detail: string
}

export interface ExperimentPlan {
  id: string
  label: string
  price: string
  cadence: string
  highlighted?: boolean
}

export interface ExperimentConfig {
  id: ExperimentId
  badge: string
  headline: string
  subhead: string
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
