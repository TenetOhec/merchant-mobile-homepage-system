import type { HomeConfig } from './types.js';

const growthOff = {
  enabled: false,
  intervalSeconds: 10,
  minStep: '1',
  maxStep: '3',
  lastTickAt: ''
};

export const defaultConfig: HomeConfig = {
  store: {
    name: '娅**店',
    avatar: '',
    notice: '其他店铺有新消息',
    showSearch: true,
    showScan: true
  },
  stats: [
    { label: '待付款', value: '2', group: 'top', growth: { ...growthOff } },
    { label: '待发货', value: '28', group: 'top', growth: { ...growthOff } },
    { label: '待收货', value: '656', group: 'top', growth: { ...growthOff } },
    { label: '待处理', value: '2', group: 'top', growth: { ...growthOff } },
    { label: '退款售后', value: '179', group: 'top', growth: { ...growthOff } },
    { label: '推广费', value: '0', group: 'bottom', growth: { ...growthOff } },
    { label: '成交额', value: '696.8', group: 'bottom', growth: { ...growthOff } },
    { label: '订单数', value: '12', group: 'bottom', growth: { ...growthOff } },
    { label: '访客数', value: '74', group: 'bottom', growth: { ...growthOff } },
    { label: '评价数', value: '1', group: 'bottom', growth: { ...growthOff } }
  ],
  menus: [
    { title: '商品管理', icon: 'ShoppingBag', badge: '99+', sort: 1, visible: true },
    { title: '营销工具', icon: 'BadgePercent', badge: '', sort: 2, visible: true },
    { title: '数据中心', icon: 'BarChart3', badge: '', sort: 3, visible: true },
    { title: '营销活动', icon: 'Sparkles', badge: 'HOT', sort: 4, visible: true },
    { title: '推广平台', icon: 'MapPinned', badge: '', sort: 5, visible: true },
    { title: '打单工具', icon: 'Printer', badge: '', sort: 6, visible: true },
    { title: '追两体验', icon: 'MessageSquareQuote', badge: '新', sort: 7, visible: true },
    { title: '品质诊断', icon: 'ShieldAlert', badge: '1', sort: 8, visible: true },
    { title: '防控中心', icon: 'Package', badge: '', sort: 9, visible: true },
    { title: '更多', icon: 'LayoutGrid', badge: '', sort: 10, visible: true }
  ],
  chips: [
    { label: '售后风险防控', badge: '1', sort: 1, visible: true, growth: { ...growthOff } },
    { label: '物流停滞', badge: '18', sort: 2, visible: true, growth: { ...growthOff } },
    { label: '即将逾期发货', badge: '1', sort: 3, visible: true, growth: { ...growthOff } },
    { label: '待处理售后', badge: '79', sort: 4, visible: true, growth: { ...growthOff } },
    { label: '可申诉订单', badge: '99+', sort: 5, visible: true, growth: { ...growthOff } },
    { label: '重要通知', badge: '6', sort: 6, visible: true, growth: { ...growthOff } },
    { label: '体检待处理', badge: '2', sort: 7, visible: true, growth: { ...growthOff } }
  ],
  workOrder: {
    title: '店铺有工单将逾期，请立即处理，否则将导致平台介入影响纠纷退款率',
    amount: '59.9',
    countdown: '07时41分',
    buttonText: '去处理',
    imageUrl: ''
  },
  improveCard: {
    title: '开通退货包运费，你的店铺订单量还能涨约32%',
    traffic: '25%',
    order: '32%',
    buttonText: '立即开通'
  },
  bottomNav: [
    { label: '首页', icon: 'House', badge: '', active: true, visible: true },
    { label: '聊天', icon: 'MessageCircleMore', badge: '21', active: false, visible: true },
    { label: '订单', icon: 'ReceiptText', badge: '1', active: false, visible: true },
    { label: '成长', icon: 'ChartColumnIncreasing', badge: '', active: false, visible: true },
    { label: '我的', icon: 'CircleUserRound', badge: '', active: false, visible: true }
  ]
};
