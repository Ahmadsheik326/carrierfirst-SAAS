// components/calculator/freight-calculator.tsx
'use client';

import { useState, useCallback, useTransition } from 'react';
import { calculateFreight, formatCurrency } from '@/lib/utils/calculator';
import { EQUIPMENT_TYPES, MARKETS } from '@/lib/constants/pricing';
import { saveQuote } from '@/actions/saved-quotes';
import type { CalculationResult, LoadInput } from '@/types';

interface FreightCalculatorProps {
  onCalculate?: (result: CalculationResult, input: LoadInput) => void;
  showSubmit?: boolean;
  readOnly?: boolean;
  initialValues?: Partial<LoadInput>;
}

export default function FreightCalculator({
  onCalculate,
  showSubmit = false,
  readOnly = false,
  initialValues,
}: FreightCalculatorProps) {
  const [input, setInput] = useState<LoadInput>({
    equipment: initialValues?.equipment || EQUIPMENT_TYPES[0],
    origin: initialValues?.origin || '',
    mileage: initialValues?.mileage || 0,
    weight: initialValues?.weight || 0,
    stops: initialValues?.stops || 0,
    tarp: initialValues?.tarp || false,
    regionX: initialValues?.regionX || false,
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isSaving, startSaveTransition] = useTransition();
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCalculate = useCallback(() => {
    const calc = calculateFreight(input);
    setResult(calc);
    setSaveMessage(null); // clear any stale save confirmation from a previous calc
    onCalculate?.(calc, input);
  }, [input, onCalculate]);

  const updateField = <K extends keyof LoadInput>(field: K, value: LoadInput[K]) => {
    setInput((prev) => ({ ...prev, [field]: value }));
    if (result) {
      const newInput = { ...input, [field]: value };
      setResult(calculateFreight(newInput));
      setSaveMessage(null);
    }
  };

  const handleSave = () => {
    if (!result) return;
    setSaveMessage(null);
    startSaveTransition(async () => {
      try {
        await saveQuote(input, result);
        setSaveMessage({ type: 'success', text: 'Quote saved. Find it under Saved Quotes.' });
      } catch (err: any) {
        setSaveMessage({ type: 'error', text: err.message || 'Failed to save quote' });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Equipment type</label>
          <select
            value={input.equipment}
            onChange={(e) => updateField('equipment', e.target.value)}
            disabled={readOnly}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            {EQUIPMENT_TYPES.map((eq) => (
              <option key={eq} value={eq}>{eq}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Market</label>
          <select
            value={input.origin ? input.origin : ''}
            onChange={(e) => updateField('origin', e.target.value)}
            disabled={readOnly}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            <option value="">Select market...</option>
            {MARKETS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mileage</label>
          <input
            type="number"
            value={input.mileage || ''}
            onChange={(e) => updateField('mileage', parseFloat(e.target.value) || 0)}
            disabled={readOnly}
            placeholder="0"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Weight (lbs)</label>
          <input
            type="number"
            value={input.weight || ''}
            onChange={(e) => updateField('weight', parseFloat(e.target.value) || 0)}
            disabled={readOnly}
            placeholder="0"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Number of stops</label>
          <input
            type="number"
            value={input.stops || ''}
            onChange={(e) => updateField('stops', parseInt(e.target.value) || 0)}
            disabled={readOnly}
            placeholder="0"
            min={0}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        <div className="flex items-end gap-4 pb-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={input.tarp}
              onChange={(e) => updateField('tarp', e.target.checked)}
              disabled={readOnly}
              className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
            />
            <span className="text-sm text-gray-700">Tarp (+$100)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={input.regionX}
              onChange={(e) => updateField('regionX', e.target.checked)}
              disabled={readOnly}
              className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
            />
            <span className="text-sm text-gray-700">Region X (+$350)</span>
          </label>
        </div>
      </div>

      {!readOnly && (
        <button
          onClick={handleCalculate}
          className="w-full md:w-auto bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          Calculate Rate
        </button>
      )}

      {result && (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Rate Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-1.5 border-b border-gray-200 border-dashed">
              <span className="text-gray-600">Base RPM ({result.market})</span>
              <span className="font-medium">{formatCurrency(result.baseRPM)}/mi</span>
            </div>
            {result.weightAdjRPM > 0 && (
              <div className="flex justify-between py-1.5 border-b border-gray-200 border-dashed">
                <span className="text-gray-600">Weight adjustment</span>
                <span className="font-medium">+{formatCurrency(result.weightAdjRPM)}/mi</span>
              </div>
            )}
            <div className="flex justify-between py-1.5 border-b border-gray-200 border-dashed">
              <span className="text-gray-600">Effective RPM</span>
              <span className="font-medium">{formatCurrency(result.effectiveRPM)}/mi</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-200 border-dashed">
              <span className="text-gray-600">Linehaul ({input.mileage} mi)</span>
              <span className="font-medium">{formatCurrency(result.linehaul)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-200 border-dashed">
              <span className="text-gray-600">Stop fees ({input.stops} × $75)</span>
              <span className="font-medium">{formatCurrency(result.stopFee)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-200 border-dashed">
              <span className="text-gray-600">Tarp fee</span>
              <span className="font-medium">{formatCurrency(result.tarpFee)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-200 border-dashed">
              <span className="text-gray-600">Region X surcharge</span>
              <span className="font-medium">{formatCurrency(result.regionXFee)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-200 border-dashed">
              <span className="text-gray-600">Short-mile surcharge</span>
              <span className="font-medium">{formatCurrency(result.shortMile)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-200 border-dashed">
              <span className="text-gray-600">Service charges</span>
              <span className="font-medium">{formatCurrency(result.serviceCharges)}</span>
            </div>
            <div className="flex justify-between py-2 pt-3 border-t-2 border-gray-300">
              <span className="font-semibold text-gray-900">Bid Total</span>
              <span className="font-bold text-lg text-gray-900">{formatCurrency(result.bidTotal)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Broker margin (15%)</span>
              <span className="font-medium text-gray-500">{formatCurrency(result.margin)}</span>
            </div>
          </div>

          {showSubmit && (
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-white border border-gray-300 text-gray-900 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Quote'}
              </button>
              {saveMessage && (
                <span className={`text-sm ${saveMessage.type === 'success' ? 'text-green-700' : 'text-red-600'}`}>
                  {saveMessage.text}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}