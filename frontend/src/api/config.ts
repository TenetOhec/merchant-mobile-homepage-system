import { apiClient } from './client';
import type { HomeConfig } from '../types/config';

export async function fetchConfig() {
  const { data } = await apiClient.get<HomeConfig>('/config');
  return data;
}

export async function saveConfig(config: HomeConfig) {
  const { data } = await apiClient.put<HomeConfig>('/config', config);
  return data;
}

export async function resetConfig() {
  const { data } = await apiClient.post<HomeConfig>('/config/reset');
  return data;
}
