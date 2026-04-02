import type { GrowthConfig } from '../types/config';

type LegacyGrowthConfig = Partial<{
  enabled: boolean;
  baseValue: string;
  step: string;
  everyMinutes: number;
  startedAt: string;
}>;

export function createDefaultGrowth(): GrowthConfig {
  return {
    enabled: false,
    intervalSeconds: 10,
    minStep: '1',
    maxStep: '3',
    lastTickAt: ''
  };
}

export function normalizeGrowthConfig(growth?: Partial<GrowthConfig> | LegacyGrowthConfig): GrowthConfig {
  const defaults = createDefaultGrowth();

  if (!growth) {
    return defaults;
  }

  return {
    enabled: growth.enabled ?? defaults.enabled,
    intervalSeconds:
      'intervalSeconds' in growth
        ? Number(growth.intervalSeconds) || defaults.intervalSeconds
        : (Number((growth as LegacyGrowthConfig).everyMinutes) || 0) * 60 || defaults.intervalSeconds,
    minStep:
      'minStep' in growth
        ? String(growth.minStep ?? defaults.minStep)
        : String((growth as LegacyGrowthConfig).step ?? defaults.minStep),
    maxStep:
      'maxStep' in growth
        ? String(growth.maxStep ?? defaults.maxStep)
        : String((growth as LegacyGrowthConfig).step ?? defaults.maxStep),
    lastTickAt:
      'lastTickAt' in growth ? String(growth.lastTickAt ?? defaults.lastTickAt) : String((growth as LegacyGrowthConfig).startedAt ?? defaults.lastTickAt)
  };
}
