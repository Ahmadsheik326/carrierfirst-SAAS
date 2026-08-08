// lib/constants/pricing.ts

export const EQUIPMENT_TYPES = [
  '0 - 10 feet Hot Shot',
  '11 - 20 feet Hot Shot',
  '21 - 30 feet Hot Shot',
  '31 - 40 feet Hot Shot',
  '42 feet Hot Shot',
  'Stepdeck',
  'Flatbed',
] as const;

export const MARKETS = [
  'Chicago IL',
  'Philadelphia',
  'Charlotte',
  'Atlanta GA',
  'Denver CO',
  'Houston TX',
  'Cleveland OH',
  'Des Moines IA',
] as const;

export const ADD_ONS = {
  regionXSurcharge: 350,
  stopFee: 75,
  tarpFee: 100,
  serviceCharge1: 3.25,
  serviceCharge2: 2.65,
  serviceCharge3: 1.75,
} as const;

export const SHORT_MILE_RULES = {
  hotShotUnder200: 350,
  flatbedStepdeckUnder200: 500,
  flatbedStepdeck201to275: 100,
} as const;

export const WEIGHT_ADJUSTMENTS = {
  hotShotUnder3000: 0,
  hotShot3100to10000: 0.1084,
  hotShot10000to14999: 0.10,
  hotShot15000to20000: 0.10,
} as const;

export const BROKER_MARGIN_PCT = 0.15;

export const DEFAULT_RPM_MATRIX: Record<string, Record<string, number>> = {
  '0 - 10 feet Hot Shot': {
    'Chicago IL': 2.10, 'Philadelphia': 2.20, 'Charlotte': 2.05, 'Atlanta GA': 2.15,
    'Denver CO': 2.50, 'Houston TX': 2.30, 'Cleveland OH': 2.15, 'Des Moines IA': 2.40,
  },
  '11 - 20 feet Hot Shot': {
    'Chicago IL': 2.30, 'Philadelphia': 2.40, 'Charlotte': 2.25, 'Atlanta GA': 2.35,
    'Denver CO': 2.70, 'Houston TX': 2.50, 'Cleveland OH': 2.35, 'Des Moines IA': 2.60,
  },
  '21 - 30 feet Hot Shot': {
    'Chicago IL': 2.50, 'Philadelphia': 2.60, 'Charlotte': 2.45, 'Atlanta GA': 2.55,
    'Denver CO': 2.90, 'Houston TX': 2.70, 'Cleveland OH': 2.55, 'Des Moines IA': 2.80,
  },
  '31 - 40 feet Hot Shot': {
    'Chicago IL': 2.80, 'Philadelphia': 2.90, 'Charlotte': 2.75, 'Atlanta GA': 2.85,
    'Denver CO': 3.20, 'Houston TX': 3.00, 'Cleveland OH': 2.85, 'Des Moines IA': 3.10,
  },
  '42 feet Hot Shot': {
    'Chicago IL': 3.00, 'Philadelphia': 3.10, 'Charlotte': 2.95, 'Atlanta GA': 3.05,
    'Denver CO': 3.40, 'Houston TX': 3.20, 'Cleveland OH': 3.05, 'Des Moines IA': 3.30,
  },
  'Stepdeck': {
    'Chicago IL': 2.40, 'Philadelphia': 2.50, 'Charlotte': 2.35, 'Atlanta GA': 2.45,
    'Denver CO': 2.80, 'Houston TX': 2.60, 'Cleveland OH': 2.45, 'Des Moines IA': 2.70,
  },
  'Flatbed': {
    'Chicago IL': 2.20, 'Philadelphia': 2.30, 'Charlotte': 2.15, 'Atlanta GA': 2.25,
    'Denver CO': 2.60, 'Houston TX': 2.40, 'Cleveland OH': 2.25, 'Des Moines IA': 2.50,
  },
};
