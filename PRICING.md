# Membership Paywall Pricing

Source of truth: [`user.justincarroll.public.paywall-pricing`](https://gns.int.sgns.chess-platform.com/key/user.justincarroll.public.paywall-pricing)

```json
{
  "title": "Chess.com Membership Paywall Pricing",
  "description": "Standard pricing and copy for the membership paywall. Default state is trialEligible.",
  "defaultState": "trialEligible",
  "states": {
    "trialEligible": {
      "headline": "Get 1 Week of Premium for Free",
      "cta": "Try for $0.00"
    },
    "notTrialEligible": {
      "headline": "Get the Very Best of Chess",
      "cta": "Go Premium"
    }
  },
  "billingPeriods": ["yearly", "monthly"],
  "plans": {
    "diamond": {
      "displayName": "Diamond",
      "tier": 1,
      "yearly": {
        "monthlyRate": 10.00,
        "monthlyRateDisplay": "$10.00/mo",
        "annualTotal": 119.99,
        "subtext": "billed annually, $119.99/yr"
      },
      "monthly": {
        "monthlyRate": 16.99,
        "monthlyRateDisplay": "$16.99/mo",
        "subtext": null
      }
    },
    "platinum": {
      "displayName": "Platinum",
      "tier": 2,
      "yearly": {
        "monthlyRate": 6.67,
        "monthlyRateDisplay": "$6.67/mo",
        "annualTotal": 79.99,
        "subtext": "billed annually, $79.99/yr"
      },
      "monthly": {
        "monthlyRate": 10.99,
        "monthlyRateDisplay": "$10.99/mo",
        "subtext": null
      }
    },
    "gold": {
      "displayName": "Gold",
      "tier": 3,
      "yearly": {
        "monthlyRate": 4.17,
        "monthlyRateDisplay": "$4.17/mo",
        "annualTotal": 49.99,
        "subtext": "billed annually, $49.99/yr"
      },
      "monthly": {
        "monthlyRate": 6.99,
        "monthlyRateDisplay": "$6.99/mo",
        "subtext": null
      }
    },
    "friendsAndFamily": {
      "displayName": "Friends & Family",
      "tier": 4,
      "yearly": {
        "monthlyRate": 16.67,
        "monthlyRateDisplay": "$16.67/mo",
        "annualTotal": 199.99,
        "subtext": "billed annually, $199.99/yr"
      },
      "monthly": null
    }
  }
}
```
