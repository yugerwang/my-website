"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';

import { marketData, type RegionName } from '@/lib/data';

const regionOptions: Array<'全国' | RegionName> = [
  '全国',
  '华北',
  '东北',
  '华东',
  '华南',
  '华中',
  '西南',
  '西北',
];

function formatNumber(value: number) {
  return new Intl.NumberFormat('zh-CN').format(value);
}

function StatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-soft">
      <div className="mb-2 text-sm text-slate-400">{label}</div>
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-3 text-xs text-slate-400">{note}</div>
    </div>
  );
}

export default function HomePage() {
  const [region, setRegion] = useState<'全国' | RegionName>('全国');
  const [metric, setMetric] = useState<'transactions' | 'avgPrice'>('transactions');
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const layerGroup = useRef<L.LayerGroup | null>(null);

  const filteredData = useMemo(() => {
    if (region === '全国') return marketData;
    return marketData.filter((item) => item.region === region);
  }, [region]);

  const totalTransactions = filteredData.reduce((sum, item) => sum + item.transactions, 0);
  const totalVolume = filteredData.reduce((sum, item) => sum + item.volume, 0);
  const avgPrice =
    filteredData.reduce((sum, item) => sum + item.avgPrice, 0) / Math.max(filteredData.length, 1);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: true,
    }).setView([35.5, 105.0], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap 贡献者',
    }).addTo(map);

    const layers = L.layerGroup().addTo(map);
    layerGroup.current = layers;
    mapInstance.current = map;
  }, []);

  useEffect(() => {
    if (!mapInstance.current || !layerGroup.current) return;

    const group = layerGroup.current;
    group.clearLayers();

    filteredData.forEach((item) => {
      const value = metric === 'transactions' ? item.transactions : item.avgPrice;
      const radius = metric === 'transactions'
        ? 8 + Math.sqrt(item.transactions) * 0.7
        : 8 + Math.sqrt(item.avgPrice / 100) * 0.9;

      const color = metric === 'transactions' ? '#06b6d4' : '#f59e0b';

      const circle = L.circleMarker([item.lat, item.lng], {
        radius,
        color,
        fillColor: color,
        fillOpacity: 0.7,
        weight: 1,
      });

      const popupHtml = `
        <div style="min-width: 160px; line-height: 1.6; font-size: 12px; color: #0f172a;">
          <div><strong>${item.name}</strong></div>
          <div>成交量：${formatNumber(item.transactions)}套</div>
          <div>均价：¥${formatNumber(item.avgPrice)}元/㎡</div>
          <div>成交额：¥${formatNumber(item.volume)}亿元</div>
          <div>同比：${item.yoy > 0 ? '+' : ''}${item.yoy}%</div>
        </div>
      `;

      circle.bindPopup(popupHtml);
      circle.bindTooltip(item.name, { direction: 'top', opacity: 0.9 });
      circle.addTo(group);
    });

    const bounds = L.latLngBounds(filteredData.map((item) => [item.lat, item.lng] as [number, number]));
    if (filteredData.length > 1) {
      mapInstance.current.fitBounds(bounds.pad(0.35), { animate: true });
    } else if (filteredData.length === 1) {
      mapInstance.current.setView([filteredData[0].lat, filteredData[0].lng], 6);
    }
  }, [filteredData, metric]);

  useEffect(() => {
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const cards = [
    {
      label: '交易套数',
      value: `${formatNumber(totalTransactions)} 套`,
      note: '本期成交量',
    },
    {
      label: '成交金额',
      value: `¥${formatNumber(Math.round(totalVolume))} 亿元`,
      note: '累计成交额',
    },
    {
      label: '均价水平',
      value: `¥${formatNumber(Math.round(avgPrice))} 元/㎡`,
      note: '区域均价',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-soft backdrop-blur-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.24em] text-cyan-400">Housing Market Monitor</p>
              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                全国房产交易数据地图
              </h1>
            </div>

            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-slate-200">
                <span className="text-slate-400">区域</span>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value as '全国' | RegionName)}
                  className="bg-transparent outline-none"
                >
                  {regionOptions.map((option) => (
                    <option key={option} value={option} className="text-slate-900">
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-slate-200">
                <span className="text-slate-400">指标</span>
                <select
                  value={metric}
                  onChange={(e) => setMetric(e.target.value as 'transactions' | 'avgPrice')}
                  className="bg-transparent outline-none"
                >
                  <option value="transactions" className="text-slate-900">成交套数</option>
                  <option value="avgPrice" className="text-slate-900">均价</option>
                </select>
              </label>
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <StatCard key={card.label} label={card.label} value={card.value} note={card.note} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-soft">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Map View</p>
                <h2 className="text-xl font-medium text-white">区域市场态势</h2>
              </div>
              <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
                {filteredData.length} 个样本区域
              </div>
            </div>
            <div ref={mapRef} className="h-[560px] w-full bg-slate-900" />
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-soft">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-400">区域榜单</p>
              <div className="space-y-3">
                {filteredData
                  .slice()
                  .sort((a, b) => b.transactions - a.transactions)
                  .slice(0, 5)
                  .map((item, index) => (
                    <div key={item.code} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/15 text-xs font-medium text-cyan-300">
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{item.name}</div>
                          <div className="text-[11px] text-slate-400">{item.region}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-cyan-300">{formatNumber(item.transactions)}套</div>
                        <div className="text-[11px] text-slate-400">{item.yoy > 0 ? '+' : ''}{item.yoy}%</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-soft">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-400">数据来源</p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>• 住房成交数据：各省市政府公开交易平台</li>
                <li>• 房价信息：地方住建委与国土部门数据</li>
                <li>• 统计口径：示例版地图数据，用于展示结构与交互</li>
                <li>• 后续扩展：可替换为 CSV/JSON / API 接口格式</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
