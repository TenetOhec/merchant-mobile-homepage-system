import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defaultConfig } from './defaultConfig.js';
import type { ChipItem, GrowthConfig, HomeConfig, StatItem } from './types.js';

type LegacyGrowthConfig = Partial<{
  enabled: boolean;
  baseValue: string;
  step: string;
  everyMinutes: number;
  startedAt: string;
}>;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, '../data');
const dataFile = path.join(dataDir, 'config.runtime.json');

function cloneDefaultConfig() {
  return JSON.parse(JSON.stringify(defaultConfig)) as HomeConfig;
}

function createDefaultGrowth(): GrowthConfig {
  return {
    enabled: false,
    intervalSeconds: 10,
    minStep: '1',
    maxStep: '3',
    lastTickAt: ''
  };
}

function isNumericText(value: string) {
  return /^-?\d+(?:\.\d+)?$/.test(value.trim());
}

function getDecimalPlaces(value: string) {
  const parts = value.split('.');
  return parts[1]?.length ?? 0;
}

function formatWithPrecision(value: number, decimals: number) {
  if (decimals <= 0) {
    return String(Math.round(value));
  }

  return value.toFixed(decimals);
}

function randomInRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function normalizeGrowthConfig(growth?: Partial<GrowthConfig> | LegacyGrowthConfig): GrowthConfig {
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

function applyGrowthToValue(rawValue: string, growth: GrowthConfig) {
  if (!growth.enabled || !isNumericText(rawValue) || !isNumericText(growth.minStep) || !isNumericText(growth.maxStep) || growth.intervalSeconds <= 0) {
    return { value: rawValue, growth, changed: false };
  }

  const minStep = Number(growth.minStep);
  const maxStep = Number(growth.maxStep);
  if (!Number.isFinite(minStep) || !Number.isFinite(maxStep) || maxStep < minStep) {
    return { value: rawValue, growth, changed: false };
  }

  const lastTickAt = new Date(growth.lastTickAt).getTime();
  if (Number.isNaN(lastTickAt)) {
    return { value: rawValue, growth, changed: false };
  }

  const now = Date.now();
  const elapsedIntervals = Math.floor((now - lastTickAt) / (growth.intervalSeconds * 1000));
  if (elapsedIntervals <= 0) {
    return { value: rawValue, growth, changed: false };
  }

  const decimals = getDecimalPlaces(rawValue);
  let nextValue = Number(rawValue);

  for (let index = 0; index < elapsedIntervals; index += 1) {
    nextValue += randomInRange(minStep, maxStep);
    nextValue = Number(formatWithPrecision(nextValue, decimals));
  }

  return {
    value: formatWithPrecision(nextValue, decimals),
    growth: {
      ...growth,
      lastTickAt: new Date(lastTickAt + elapsedIntervals * growth.intervalSeconds * 1000).toISOString()
    },
    changed: true
  };
}

function normalizeStatItem(item: StatItem, previous?: StatItem, preserveTick = false): StatItem {
  const growth = normalizeGrowthConfig(item.growth);
  const previousGrowth = normalizeGrowthConfig(previous?.growth);

  if (!growth.enabled) {
    return { ...item, growth: { ...growth, lastTickAt: '' } };
  }

  if (preserveTick) {
    return { ...item, growth };
  }

  const shouldResetTick = !previousGrowth.enabled || !growth.lastTickAt;
  return {
    ...item,
    growth: {
      ...growth,
      lastTickAt: shouldResetTick ? new Date().toISOString() : growth.lastTickAt
    }
  };
}

function normalizeChipItem(item: ChipItem, previous?: ChipItem, preserveTick = false): ChipItem {
  const growth = normalizeGrowthConfig(item.growth);
  const previousGrowth = normalizeGrowthConfig(previous?.growth);

  if (!growth.enabled) {
    return { ...item, growth: { ...growth, lastTickAt: '' } };
  }

  if (preserveTick) {
    return { ...item, growth };
  }

  const shouldResetTick = !previousGrowth.enabled || !growth.lastTickAt;
  return {
    ...item,
    growth: {
      ...growth,
      lastTickAt: shouldResetTick ? new Date().toISOString() : growth.lastTickAt
    }
  };
}

function normalizeConfig(config: HomeConfig, previous?: HomeConfig, preserveTick = false): HomeConfig {
  return {
    ...config,
    stats: config.stats.map((item, index) => normalizeStatItem(item, previous?.stats[index], preserveTick)),
    chips: config.chips.map((item, index) => normalizeChipItem(item, previous?.chips[index], preserveTick))
  };
}

function applyPersistentGrowth(config: HomeConfig) {
  let changed = false;

  const stats = config.stats.map((item) => {
    const normalizedGrowth = normalizeGrowthConfig(item.growth);
    const next = applyGrowthToValue(item.value, normalizedGrowth);
    if (next.changed) {
      changed = true;
    }
    return { ...item, value: next.value, growth: next.growth };
  });

  const chips = config.chips.map((item) => {
    const normalizedGrowth = normalizeGrowthConfig(item.growth);
    const next = applyGrowthToValue(item.badge, normalizedGrowth);
    if (next.changed) {
      changed = true;
    }
    return { ...item, badge: next.value, growth: next.growth };
  });

  return {
    config: {
      ...config,
      stats,
      chips
    },
    changed
  };
}

async function writeConfig(config: HomeConfig) {
  await writeFile(dataFile, JSON.stringify(config, null, 2), 'utf-8');
}

async function readRuntimeConfig() {
  await ensureConfigFile();
  const content = await readFile(dataFile, 'utf-8');
  return JSON.parse(content) as HomeConfig;
}

export async function ensureConfigFile() {
  await mkdir(dataDir, { recursive: true });
  try {
    await readFile(dataFile, 'utf-8');
  } catch {
    await writeConfig(cloneDefaultConfig());
  }
}

export async function getConfig() {
  const config = normalizeConfig(await readRuntimeConfig(), undefined, true);
  const { config: nextConfig, changed } = applyPersistentGrowth(config);

  if (changed) {
    await writeConfig(nextConfig);
  }

  return nextConfig;
}

export async function saveConfig(config: HomeConfig) {
  const previous = await readRuntimeConfig();
  const nextConfig = normalizeConfig(config, previous);
  await writeConfig(nextConfig);
  return nextConfig;
}

export async function resetConfig() {
  const config = cloneDefaultConfig();
  await saveConfig(config);
  return config;
}
