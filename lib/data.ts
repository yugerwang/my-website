export type RegionName =
  | '华北'
  | '东北'
  | '华东'
  | '华南'
  | '华中'
  | '西南'
  | '西北';

export type MarketRecord = {
  code: string;
  name: string;
  region: RegionName;
  lat: number;
  lng: number;
  transactions: number;
  avgPrice: number;
  volume: number;
  yoy: number;
};

export const marketData: MarketRecord[] = [
  { code: 'BJ', name: '北京', region: '华北', lat: 39.9042, lng: 116.4074, transactions: 18420, avgPrice: 48200, volume: 278.5, yoy: 8.7 },
  { code: 'TJ', name: '天津', region: '华北', lat: 39.3434, lng: 117.3616, transactions: 9800, avgPrice: 32100, volume: 58.4, yoy: 6.3 },
  { code: 'HEB', name: '河北', region: '华北', lat: 38.0458, lng: 114.5149, transactions: 11340, avgPrice: 24600, volume: 48.7, yoy: 5.4 },
  { code: 'LN', name: '辽宁', region: '东北', lat: 41.2995, lng: 123.344, transactions: 9620, avgPrice: 23100, volume: 39.8, yoy: 4.6 },
  { code: 'JL', name: '吉林', region: '东北', lat: 43.896, lng: 125.3254, transactions: 6700, avgPrice: 21250, volume: 24.9, yoy: 3.9 },
  { code: 'HLJ', name: '黑龙江', region: '东北', lat: 45.8038, lng: 126.534, transactions: 5400, avgPrice: 19850, volume: 19.2, yoy: 2.4 },
  { code: 'SH', name: '上海', region: '华东', lat: 31.2304, lng: 121.4737, transactions: 21280, avgPrice: 57800, volume: 390.2, yoy: 10.8 },
  { code: 'JS', name: '江苏', region: '华东', lat: 32.0603, lng: 118.7969, transactions: 24600, avgPrice: 36400, volume: 210.4, yoy: 9.5 },
  { code: 'ZJ', name: '浙江', region: '华东', lat: 30.2741, lng: 120.1551, transactions: 18920, avgPrice: 39200, volume: 178.3, yoy: 8.9 },
  { code: 'GD', name: '广东', region: '华南', lat: 23.1291, lng: 113.2644, transactions: 25850, avgPrice: 41600, volume: 248.2, yoy: 11.2 },
  { code: 'GX', name: '广西', region: '华南', lat: 22.8242, lng: 108.3200, transactions: 8900, avgPrice: 21100, volume: 31.8, yoy: 6.7 },
  { code: 'HN', name: '海南', region: '华南', lat: 20.0458, lng: 110.3417, transactions: 4200, avgPrice: 26800, volume: 12.6, yoy: 5.1 },
  { code: 'HB', name: '湖北', region: '华中', lat: 30.5928, lng: 114.3052, transactions: 13280, avgPrice: 25700, volume: 47.5, yoy: 7.4 },
  { code: 'HN2', name: '湖南', region: '华中', lat: 28.2135, lng: 112.9834, transactions: 12400, avgPrice: 24600, volume: 42.1, yoy: 6.8 },
  { code: 'SD', name: '山东', region: '华东', lat: 36.6683, lng: 116.9972, transactions: 17800, avgPrice: 29500, volume: 96.1, yoy: 7.2 },
  { code: 'SC', name: '四川', region: '西南', lat: 30.5728, lng: 104.0665, transactions: 15880, avgPrice: 28200, volume: 82.7, yoy: 8.0 },
  { code: 'CQ', name: '重庆', region: '西南', lat: 29.5630, lng: 106.5516, transactions: 10920, avgPrice: 25400, volume: 51.4, yoy: 7.1 },
  { code: 'YN', name: '云南', region: '西南', lat: 25.0443, lng: 102.7123, transactions: 7600, avgPrice: 21400, volume: 22.9, yoy: 4.9 },
  { code: 'XJ', name: '新疆', region: '西北', lat: 43.8256, lng: 87.6168, transactions: 5800, avgPrice: 19900, volume: 17.4, yoy: 3.8 },
  { code: 'SHA', name: '陕西', region: '西北', lat: 34.3416, lng: 108.9398, transactions: 9900, avgPrice: 23800, volume: 31.6, yoy: 5.7 },
  { code: 'GS', name: '甘肃', region: '西北', lat: 36.0611, lng: 103.8343, transactions: 4700, avgPrice: 17250, volume: 13.1, yoy: 2.1 },
  { code: 'FJ', name: '福建', region: '华东', lat: 26.0745, lng: 119.2965, transactions: 12140, avgPrice: 31200, volume: 58.6, yoy: 7.9 },
];
