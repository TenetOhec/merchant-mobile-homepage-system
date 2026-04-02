import { create } from 'zustand';
import { fetchConfig } from '../api/config';
import { defaultConfig } from '../config/defaultConfig';
import type { HomeConfig } from '../types/config';

interface ConfigState {
  config: HomeConfig;
  loading: boolean;
  refreshing: boolean;
  error: string;
  fetchRemote: (type?: 'loading' | 'refresh') => Promise<HomeConfig | undefined>;
  setConfig: (config: HomeConfig) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  config: defaultConfig,
  loading: true,
  refreshing: false,
  error: '',
  async fetchRemote(type = 'loading') {
    set(type === 'refresh' ? { refreshing: true, error: '' } : { loading: true, error: '' });
    try {
      const config = await fetchConfig();
      set({ config, loading: false, refreshing: false });
      return config;
    } catch (error) {
      const message = error instanceof Error ? error.message : '配置加载失败';
      set({ error: message, loading: false, refreshing: false });
    }
  },
  setConfig(config) {
    set({ config });
  }
}));
