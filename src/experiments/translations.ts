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
      diamond: 'Everything in Platinum + Move Explanations, Insights, Courses Perks',
      platinum: 'Everything in Gold + Game Review',
      gold: 'Unlimited: Puzzles, Lessons, Bots, Play Coach, No Ads',
    },
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
      diamond: 'Alles in Platin + Zugerklärungen, Erkenntnisse, Kursvorteile',
      platinum: 'Alles in Gold + Partieanalyse',
      gold: 'Unbegrenzt: Aufgaben, Lektionen, Bots, Spielcoach, Keine Werbung',
    },
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
      diamond: 'Все з Платина + Пояснення ходів, Аналітика, Переваги курсів',
      platinum: 'Все з Золота + Огляд партій',
      gold: 'Необмежено: Задачі, Уроки, Боти, Тренер гри, Без реклами',
    },
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
