export type LangCode = 'en' | 'de' | 'uk'

export interface PricingStateStrings {
  headline: string
  cta: string
}

export interface TranslationStrings {
  trialEligible: PricingStateStrings
  notTrialEligible: PricingStateStrings
  yearly: string
  monthly: string
  billedAnnually: (total: string) => string
  perMonth: (rate: string) => string
  unlimited: string
  mostPopular: string
  features: {
    puzzles: string
    lessons: string
    bots: string
    playCoach: string
    noAds: string
    gameReview: string
    moveExplanations: string
    insights: string
    coursesPerks: string
  }
  tiers: {
    gold: string
    platinum: string
    diamond: string
    friendsAndFamily: string
  }
  planDescriptions: {
    diamond: string
    platinum: string
    gold: string
  }
  androidPerMonthDisplay: (rate: string) => string
  androidAnnualSummary: (total: string) => string
  androidGooglePlayDisclaimerYearly: (annualTotal: string, monthlyEquivPerMo: string) => string
  androidGooglePlayDisclaimerMonthly: (monthlyRate: string) => string
}

export const translations: Record<LangCode, TranslationStrings> = {
  en: {
    trialEligible: {
      headline: 'Get 1 Week of Premium for Free',
      cta: 'Try for $0.00',
    },
    notTrialEligible: {
      headline: 'Get the Very Best of Chess',
      cta: 'Go Premium',
    },
    yearly: 'Yearly',
    monthly: 'Monthly',
    billedAnnually: (total) => `billed annually, ${total}/yr`,
    perMonth: (rate) => `${rate}/mo`,
    unlimited: 'UNLIMITED',
    mostPopular: 'Most Popular',
    features: {
      puzzles: 'Puzzles',
      lessons: 'Lessons',
      bots: 'Bots',
      playCoach: 'Play Coach',
      noAds: 'No Ads',
      gameReview: 'Game Review',
      moveExplanations: 'Move Explanations',
      insights: 'Insights',
      coursesPerks: 'Courses Perks',
    },
    tiers: {
      gold: 'Gold',
      platinum: 'Platinum',
      diamond: 'Diamond',
      friendsAndFamily: 'Friends & Family',
    },
    planDescriptions: {
      diamond: 'Unlimited Game Review, Move Explanations, Insights, Puzzles, Lessons, Coach Games, Bots, No Ads',
      platinum: 'Unlimited Puzzles, Lessons, Coach Games, Bots, Game Review, No Ads',
      gold: 'Unlimited Puzzles, Lessons, Coach Games, Bots, No Ads',
    },
    androidPerMonthDisplay: (rate) => `${rate} / month`,
    androidAnnualSummary: (total) => `12 months • ${total}`,
    androidGooglePlayDisclaimerYearly: (annualTotal, monthlyEquivPerMo) =>
      `You will be charged ${annualTotal} per year (${monthlyEquivPerMo}). You may cancel anytime in Google Play.`,
    androidGooglePlayDisclaimerMonthly: (monthlyRate) =>
      `You will be charged ${monthlyRate} per month. You may cancel anytime in Google Play.`,
  },

  de: {
    trialEligible: {
      headline: '1 Woche Premium kostenlos testen',
      cta: 'Für 0,00 $ testen',
    },
    notTrialEligible: {
      headline: 'Hol dir das Beste vom Schach',
      cta: 'Premium holen',
    },
    yearly: 'Jährlich',
    monthly: 'Monatlich',
    billedAnnually: (total) => `jährlich abgerechnet, ${total}/Jahr`,
    perMonth: (rate) => `${rate}/Mo.`,
    unlimited: 'UNBEGRENZT',
    mostPopular: 'Beliebteste',
    features: {
      puzzles: 'Aufgaben',
      lessons: 'Lektionen',
      bots: 'Bots',
      playCoach: 'Spielcoach',
      noAds: 'Keine Werbung',
      gameReview: 'Partieanalyse',
      moveExplanations: 'Zugerklärungen',
      insights: 'Erkenntnisse',
      coursesPerks: 'Kursvorteile',
    },
    tiers: {
      gold: 'Gold',
      platinum: 'Platin',
      diamond: 'Diamant',
      friendsAndFamily: 'Freunde & Familie',
    },
    planDescriptions: {
      diamond: 'Unbegrenzt: Aufgaben, Lektionen, Bots, Spielcoach, Keine Werbung, Partieanalyse, Zugerklärungen, Erkenntnisse, Kursvorteile',
      platinum: 'Unbegrenzt: Aufgaben, Lektionen, Bots, Spielcoach, Keine Werbung, Partieanalyse',
      gold: 'Unbegrenzt: Aufgaben, Lektionen, Bots, Spielcoach, Keine Werbung',
    },
    androidPerMonthDisplay: (rate) => `${rate} / Monat`,
    androidAnnualSummary: (total) => `12 Monate • ${total}`,
    androidGooglePlayDisclaimerYearly: (annualTotal, monthlyEquivPerMo) =>
      `Dir wird ${annualTotal} pro Jahr (${monthlyEquivPerMo}) berechnet. Du kannst jederzeit in Google Play kündigen.`,
    androidGooglePlayDisclaimerMonthly: (monthlyRate) =>
      `Dir wird ${monthlyRate} pro Monat berechnet. Du kannst jederzeit in Google Play kündigen.`,
  },

  uk: {
    trialEligible: {
      headline: 'Отримайте 1 тиждень Premium безкоштовно',
      cta: 'Спробувати за $0.00',
    },
    notTrialEligible: {
      headline: 'Отримайте найкраще від шахів',
      cta: 'Стати Premium',
    },
    yearly: 'Щорічно',
    monthly: 'Щомісячно',
    billedAnnually: (total) => `щорічна оплата, ${total}/рік`,
    perMonth: (rate) => `${rate}/міс.`,
    unlimited: 'НЕОБМЕЖЕНО',
    mostPopular: 'Найпопулярніший',
    features: {
      puzzles: 'Задачі',
      lessons: 'Уроки',
      bots: 'Боти',
      playCoach: 'Тренер гри',
      noAds: 'Без реклами',
      gameReview: 'Огляд партій',
      moveExplanations: 'Пояснення ходів',
      insights: 'Аналітика',
      coursesPerks: 'Переваги курсів',
    },
    tiers: {
      gold: 'Золото',
      platinum: 'Платина',
      diamond: 'Діамант',
      friendsAndFamily: 'Друзі та родина',
    },
    planDescriptions: {
      diamond: 'Необмежено: Задачі, Уроки, Боти, Тренер гри, Без реклами, Огляд партій, Пояснення ходів, Аналітика, Переваги курсів',
      platinum: 'Необмежено: Задачі, Уроки, Боти, Тренер гри, Без реклами, Огляд партій',
      gold: 'Необмежено: Задачі, Уроки, Боти, Тренер гри, Без реклами',
    },
    androidPerMonthDisplay: (rate) => `${rate} / місяць`,
    androidAnnualSummary: (total) => `12 місяців • ${total}`,
    androidGooglePlayDisclaimerYearly: (annualTotal, monthlyEquivPerMo) =>
      `З вас стягуватиметься ${annualTotal} на рік (${monthlyEquivPerMo}). Скасувати можна будь-коли в Google Play.`,
    androidGooglePlayDisclaimerMonthly: (monthlyRate) =>
      `З вас стягуватиметься ${monthlyRate} на місяць. Скасувати можна будь-коли в Google Play.`,
  },
}

export function getTranslations(lang: LangCode): TranslationStrings {
  return translations[lang] ?? translations.en
}

export function parseLangParam(value: string | null): LangCode {
  if (value === 'de' || value === 'uk') return value
  return 'en'
}

export function parseEligibleParam(value: string | null): boolean {
  if (value === 'false' || value === '0') return false
  return true
}

export type PlatformParam = 'ios' | 'android'

export function parsePlatformParam(value: string | null): PlatformParam {
  if (value === 'android') return 'android'
  return 'ios'
}
