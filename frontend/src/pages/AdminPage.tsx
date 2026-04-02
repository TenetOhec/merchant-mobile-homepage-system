import { useEffect, useMemo, useState } from 'react';
import { resetConfig, saveConfig } from '../api/config';
import { AdminLayout } from '../components/admin/AdminLayout';
import { ImageUploadInput, TextInput, Toggle } from '../components/admin/FormFields';
import { AdminSection } from '../components/admin/AdminSection';
import { normalizeGrowthConfig } from '../lib/growth';
import { iconNames } from '../lib/icons';
import { useConfigStore } from '../store/configStore';
import type { BottomNavItem, ChipItem, GrowthConfig, HomeConfig, MenuItem, StatItem } from '../types/config';

function cloneConfig(config: HomeConfig) {
  return JSON.parse(JSON.stringify(config)) as HomeConfig;
}

function toDateTimeLocalValue(value: string) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function withGrowth<T extends { growth?: GrowthConfig }>(item: T, fallbackValue: string) {
  void fallbackValue;
  return normalizeGrowthConfig(item.growth);
}

export function AdminPage() {
  const { config: remoteConfig, fetchRemote, loading, setConfig } = useConfigStore();
  const [draft, setDraft] = useState<HomeConfig>(() => cloneConfig(remoteConfig));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    void fetchRemote();
  }, [fetchRemote]);

  useEffect(() => {
    setDraft(cloneConfig(remoteConfig));
  }, [remoteConfig]);

  const iconHint = useMemo(() => iconNames.join(' / '), []);

  const updateStat = (index: number, patch: Partial<StatItem>) => {
    setDraft((current) => {
      const next = cloneConfig(current);
      next.stats[index] = { ...next.stats[index], ...patch };
      return next;
    });
  };

  const updateStatGrowth = (index: number, patch: Partial<GrowthConfig>) => {
    setDraft((current) => {
      const next = cloneConfig(current);
      next.stats[index] = {
        ...next.stats[index],
        growth: { ...withGrowth(next.stats[index], next.stats[index].value), ...patch }
      };
      return next;
    });
  };

  const updateMenu = (index: number, patch: Partial<MenuItem>) => {
    setDraft((current) => {
      const next = cloneConfig(current);
      next.menus[index] = { ...next.menus[index], ...patch };
      return next;
    });
  };

  const updateChip = (index: number, patch: Partial<ChipItem>) => {
    setDraft((current) => {
      const next = cloneConfig(current);
      next.chips[index] = { ...next.chips[index], ...patch };
      return next;
    });
  };

  const updateChipGrowth = (index: number, patch: Partial<GrowthConfig>) => {
    setDraft((current) => {
      const next = cloneConfig(current);
      next.chips[index] = {
        ...next.chips[index],
        growth: { ...withGrowth(next.chips[index], next.chips[index].badge), ...patch }
      };
      return next;
    });
  };

  const updateBottomNav = (index: number, patch: Partial<BottomNavItem>) => {
    setDraft((current) => {
      const next = cloneConfig(current);
      next.bottomNav[index] = { ...next.bottomNav[index], ...patch };
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const saved = await saveConfig(draft);
      setConfig(saved);
      setDraft(cloneConfig(saved));
      setMessage('保存成功');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleRefresh = async () => {
    setMessage('');
    const latest = await fetchRemote();
    if (latest) {
      setDraft(cloneConfig(latest));
      setMessage('已同步最新配置');
    }
  };

  const handleReset = async () => {
    setSaving(true);
    setMessage('');
    try {
      const reseted = await resetConfig();
      setConfig(reseted);
      setDraft(cloneConfig(reseted));
      setMessage('已恢复默认配置');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '重置失败');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-5 flex flex-wrap gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-appRed px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? '保存中...' : '一键保存'}
        </button>
        <button onClick={() => void handleRefresh()} className="rounded-full bg-white px-5 py-2.5 text-sm shadow-sm">
          刷新当前配置
        </button>
        <button onClick={() => void handleReset()} className="rounded-full bg-white px-5 py-2.5 text-sm shadow-sm">
          重置默认配置
        </button>
        {message && <div className="rounded-full bg-white px-4 py-2.5 text-sm text-textSub shadow-sm">{message}</div>}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <AdminSection title="基础信息" description="控制首页头部信息与按钮显隐。">
            <div className="grid gap-4 md:grid-cols-2">
              <TextInput
                label="店铺名称"
                value={draft.store.name}
                onChange={(value) => setDraft({ ...draft, store: { ...draft.store, name: value } })}
              />
              <TextInput
                label="店铺头像 URL"
                value={draft.store.avatar}
                onChange={(value) => setDraft({ ...draft, store: { ...draft.store, avatar: value } })}
              />
              <TextInput
                label="顶部提示文案"
                value={draft.store.notice}
                onChange={(value) => setDraft({ ...draft, store: { ...draft.store, notice: value } })}
                className="md:col-span-2"
              />
              <Toggle
                label="显示搜索按钮"
                checked={draft.store.showSearch}
                onChange={(checked) => setDraft({ ...draft, store: { ...draft.store, showSearch: checked } })}
              />
              <Toggle
                label="显示扫码按钮"
                checked={draft.store.showScan}
                onChange={(checked) => setDraft({ ...draft, store: { ...draft.store, showScan: checked } })}
              />
            </div>
          </AdminSection>

          <AdminSection title="顶部统计卡片" description="固定 10 项，两排各 5 项。">
            <div className="space-y-3">
              {draft.stats.map((item, index) => (
                <div key={`${item.label}-${index}`} className="grid gap-3 rounded-2xl border border-softLine p-3">
                  <div className="grid gap-3 md:grid-cols-3">
                    <TextInput label="label" value={item.label} onChange={(value) => updateStat(index, { label: value })} />
                    <TextInput label="value" value={item.value} onChange={(value) => updateStat(index, { value })} />
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-textSub">group</span>
                      <select
                        value={item.group}
                        onChange={(event) => updateStat(index, { group: event.target.value as StatItem['group'] })}
                        className="rounded-2xl border border-softLine bg-[#fafafa] px-4 py-3 outline-none"
                      >
                        <option value="top">top</option>
                        <option value="bottom">bottom</option>
                      </select>
                    </label>
                  </div>
                  <div className="rounded-2xl bg-[#fafafa] p-3">
                    <div className="mb-3 text-sm font-semibold text-textMain">定时增长</div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Toggle label="启用增长" checked={withGrowth(item, item.value).enabled} onChange={(checked) => updateStatGrowth(index, { enabled: checked })} />
                      <TextInput
                        label="间隔秒数"
                        type="number"
                        value={String(withGrowth(item, item.value).intervalSeconds)}
                        onChange={(value) => updateStatGrowth(index, { intervalSeconds: Number(value) || 0 })}
                      />
                      <TextInput label="最小增长值" value={withGrowth(item, item.value).minStep} onChange={(value) => updateStatGrowth(index, { minStep: value })} />
                      <TextInput label="最大增长值" value={withGrowth(item, item.value).maxStep} onChange={(value) => updateStatGrowth(index, { maxStep: value })} />
                      <TextInput
                        label="上次结算时间"
                        type="datetime-local"
                        value={toDateTimeLocalValue(withGrowth(item, item.value).lastTickAt)}
                        onChange={(value) => updateStatGrowth(index, { lastTickAt: value })}
                        className="md:col-span-2"
                      />
                      <div className="md:col-span-2 text-xs text-textSub">当前起点直接使用上面填写的 value。</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AdminSection>

          <AdminSection title="功能宫格" description={`图标名称可选：${iconHint}`}>
            <div className="space-y-3">
              {draft.menus.map((item, index) => (
                <div key={`${item.title}-${index}`} className="grid gap-3 rounded-2xl border border-softLine p-3 md:grid-cols-5">
                  <TextInput label="title" value={item.title} onChange={(value) => updateMenu(index, { title: value })} />
                  <TextInput label="icon" value={item.icon} onChange={(value) => updateMenu(index, { icon: value })} />
                  <TextInput label="badge" value={item.badge} onChange={(value) => updateMenu(index, { badge: value })} />
                  <TextInput
                    label="sort"
                    value={String(item.sort)}
                    onChange={(value) => updateMenu(index, { sort: Number(value) || 0 })}
                  />
                  <Toggle label="visible" checked={item.visible} onChange={(checked) => updateMenu(index, { visible: checked })} />
                </div>
              ))}
            </div>
          </AdminSection>
        </div>

        <div className="space-y-5">
          <AdminSection title="中间小卡片">
            <div className="space-y-3">
              {draft.chips.map((item, index) => (
                <div key={`${item.label}-${index}`} className="grid gap-3 rounded-2xl border border-softLine p-3">
                  <div className="grid gap-3 md:grid-cols-2">
                    <TextInput label="label" value={item.label} onChange={(value) => updateChip(index, { label: value })} />
                    <TextInput label="badge" value={item.badge} onChange={(value) => updateChip(index, { badge: value })} />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <TextInput
                      label="sort"
                      value={String(item.sort)}
                      onChange={(value) => updateChip(index, { sort: Number(value) || 0 })}
                    />
                    <Toggle label="visible" checked={item.visible} onChange={(checked) => updateChip(index, { visible: checked })} />
                  </div>
                  <div className="rounded-2xl bg-[#fafafa] p-3">
                    <div className="mb-3 text-sm font-semibold text-textMain">定时增长</div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Toggle label="启用增长" checked={withGrowth(item, item.badge).enabled} onChange={(checked) => updateChipGrowth(index, { enabled: checked })} />
                      <TextInput
                        label="间隔秒数"
                        type="number"
                        value={String(withGrowth(item, item.badge).intervalSeconds)}
                        onChange={(value) => updateChipGrowth(index, { intervalSeconds: Number(value) || 0 })}
                      />
                      <TextInput label="最小增长值" value={withGrowth(item, item.badge).minStep} onChange={(value) => updateChipGrowth(index, { minStep: value })} />
                      <TextInput label="最大增长值" value={withGrowth(item, item.badge).maxStep} onChange={(value) => updateChipGrowth(index, { maxStep: value })} />
                      <TextInput
                        label="上次结算时间"
                        type="datetime-local"
                        value={toDateTimeLocalValue(withGrowth(item, item.badge).lastTickAt)}
                        onChange={(value) => updateChipGrowth(index, { lastTickAt: value })}
                        className="md:col-span-2"
                      />
                      <div className="md:col-span-2 text-xs text-textSub">当前起点直接使用上面填写的 badge。</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AdminSection>

          <AdminSection title="工单提醒卡片">
            <div className="grid gap-4">
              <TextInput
                label="title"
                value={draft.workOrder.title}
                onChange={(value) => setDraft({ ...draft, workOrder: { ...draft.workOrder, title: value } })}
              />
              <ImageUploadInput
                label="上传图片"
                value={draft.workOrder.imageUrl}
                onChange={(value) => setDraft({ ...draft, workOrder: { ...draft.workOrder, imageUrl: value } })}
              />
              <TextInput
                label="imageUrl"
                value={draft.workOrder.imageUrl}
                onChange={(value) => setDraft({ ...draft, workOrder: { ...draft.workOrder, imageUrl: value } })}
                placeholder="也支持直接粘贴图片 URL 或 data URL"
              />
              <div className="grid gap-4 md:grid-cols-3">
                <TextInput
                  label="amount"
                  value={draft.workOrder.amount}
                  onChange={(value) => setDraft({ ...draft, workOrder: { ...draft.workOrder, amount: value } })}
                />
                <TextInput
                  label="countdown"
                  value={draft.workOrder.countdown}
                  onChange={(value) => setDraft({ ...draft, workOrder: { ...draft.workOrder, countdown: value } })}
                />
                <TextInput
                  label="buttonText"
                  value={draft.workOrder.buttonText}
                  onChange={(value) => setDraft({ ...draft, workOrder: { ...draft.workOrder, buttonText: value } })}
                />
              </div>
            </div>
          </AdminSection>

          <AdminSection title="营销提升卡片">
            <div className="grid gap-4">
              <TextInput
                label="title"
                value={draft.improveCard.title}
                onChange={(value) => setDraft({ ...draft, improveCard: { ...draft.improveCard, title: value } })}
              />
              <div className="grid gap-4 md:grid-cols-3">
                <TextInput
                  label="traffic"
                  value={draft.improveCard.traffic}
                  onChange={(value) => setDraft({ ...draft, improveCard: { ...draft.improveCard, traffic: value } })}
                />
                <TextInput
                  label="order"
                  value={draft.improveCard.order}
                  onChange={(value) => setDraft({ ...draft, improveCard: { ...draft.improveCard, order: value } })}
                />
                <TextInput
                  label="buttonText"
                  value={draft.improveCard.buttonText}
                  onChange={(value) => setDraft({ ...draft, improveCard: { ...draft.improveCard, buttonText: value } })}
                />
              </div>
            </div>
          </AdminSection>

          <AdminSection title="底部导航" description={`图标名称可选：${iconHint}`}>
            <div className="space-y-3">
              {draft.bottomNav.map((item, index) => (
                <div key={`${item.label}-${index}`} className="grid gap-3 rounded-2xl border border-softLine p-3">
                  <div className="grid gap-3 md:grid-cols-3">
                    <TextInput label="label" value={item.label} onChange={(value) => updateBottomNav(index, { label: value })} />
                    <TextInput label="icon" value={item.icon} onChange={(value) => updateBottomNav(index, { icon: value })} />
                    <TextInput label="badge" value={item.badge} onChange={(value) => updateBottomNav(index, { badge: value })} />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Toggle label="active" checked={item.active} onChange={(checked) => updateBottomNav(index, { active: checked })} />
                    <Toggle label="visible" checked={item.visible} onChange={(checked) => updateBottomNav(index, { visible: checked })} />
                  </div>
                </div>
              ))}
            </div>
          </AdminSection>
        </div>
      </div>

      {loading && <div className="mt-4 text-sm text-textSub">正在同步远端配置...</div>}
    </AdminLayout>
  );
}
