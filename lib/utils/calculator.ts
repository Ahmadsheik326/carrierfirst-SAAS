// lib/utils/calculator.ts
// Freds Data — Freight Rate Calculator Engine

import {
  ADD_ONS,
  SHORT_MILE_RULES,
  WEIGHT_ADJUSTMENTS,
  BROKER_MARGIN_PCT,
  DEFAULT_RPM_MATRIX,
} from '@/lib/constants/pricing';
import type { CalculationResult, LoadInput } from '@/types';

export function getMarketFromOrigin(origin: string): string {
  const lower = origin.toLowerCase();
  if (lower.includes('chicago')) return 'Chicago IL';
  if (lower.includes('philadelphia') || lower.includes('philly')) return 'Philadelphia';
  if (lower.includes('charlotte')) return 'Charlotte';
  if (lower.includes('atlanta')) return 'Atlanta GA';
  if (lower.includes('denver')) return 'Denver CO';
  if (lower.includes('houston')) return 'Houston TX';
  if (lower.includes('cleveland')) return 'Cleveland OH';
  if (lower.includes('des moines')) return 'Des Moines IA';
  return 'Chicago IL';
}

export function getBaseRPM(
  equipment: string,
  market: string,
  matrix?: Record<string, Record<string, number>>
): number {
  const source = matrix || DEFAULT_RPM_MATRIX;
  return source[equipment]?.[market] ?? 2.50;
}

export function getWeightAdjustment(equipment: string, weight: number): number {
  if (!equipment.includes('Hot Shot')) return 0;
  if (weight < 3000) return WEIGHT_ADJUSTMENTS.hotShotUnder3000;
  if (weight <= 10000) return WEIGHT_ADJUSTMENTS.hotShot3100to10000;
  if (weight <= 14999) return WEIGHT_ADJUSTMENTS.hotShot10000to14999;
  if (weight <= 20000) return WEIGHT_ADJUSTMENTS.hotShot15000to20000;
  return 0;
}

export function getShortMileSurcharge(equipment: string, mileage: number): number {
  if (equipment.includes('Hot Shot') && mileage < 200) {
    return SHORT_MILE_RULES.hotShotUnder200;
  }
  if ((equipment === 'Flatbed' || equipment === 'Stepdeck') && mileage < 200) {
    return SHORT_MILE_RULES.flatbedStepdeckUnder200;
  }
  if (
    (equipment === 'Flatbed' || equipment === 'Stepdeck') &&
    mileage >= 201 &&
    mileage <= 275
  ) {
    return SHORT_MILE_RULES.flatbedStepdeck201to275;
  }
  return 0;
}

export function calculateFreight(
  input: LoadInput,
  matrix?: Record<string, Record<string, number>>
): CalculationResult {
  const { equipment, origin, mileage, weight, stops, tarp, regionX } = input;

  const market = getMarketFromOrigin(origin);
  const baseRPM = getBaseRPM(equipment, market, matrix);
  const weightAdjRPM = getWeightAdjustment(equipment, weight);
  const effectiveRPM = baseRPM + weightAdjRPM;

  const linehaul = effectiveRPM * mileage;
  const stopFee = stops * ADD_ONS.stopFee;
  const tarpFee = tarp ? ADD_ONS.tarpFee : 0;
  const regionXFee = regionX ? ADD_ONS.regionXSurcharge : 0;
  const shortMile = getShortMileSurcharge(equipment, mileage);
  const serviceCharges = ADD_ONS.serviceCharge1 + ADD_ONS.serviceCharge2 + ADD_ONS.serviceCharge3;

  const bidTotal = linehaul + stopFee + tarpFee + regionXFee + shortMile + serviceCharges;
  const margin = bidTotal * BROKER_MARGIN_PCT;

  return {
    baseRPM,
    weightAdjRPM,
    effectiveRPM,
    linehaul,
    stopFee,
    tarpFee,
    regionXFee,
    shortMile,
    serviceCharges,
    bidTotal,
    margin,
    market,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function generateLoadId(existingCount: number): string {
  return `LD-${String(existingCount + 1).padStart(3, '0')}`;
}
