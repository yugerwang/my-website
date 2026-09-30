import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '全国房产交易数据地图',
  description: '全国房产交易数据可视化演示页，展示各地区成交量、均价与同比变化。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
