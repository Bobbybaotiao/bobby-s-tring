/* ====================================================================
 *  网站内容数据文件
 * ====================================================================
 *
 *  【日常更新网站，请直接打开后台管理页面】
 *     https://bobbybaotiao.github.io/bobby-s-tring/admin
 *
 *  在后台里用表单修改文字、价格、图片地址即可，像填表一样简单。
 *  点「保存」后会自动提交到 GitHub，1-2 分钟后网站更新。
 *
 *  本文件从 src/data/site-content.json 读取数据后做类型转换，
 *  日常使用不需要修改本文件。
 *
 * ==================================================================== */

import content from './site-content.json';

export const siteConfig = content.siteConfig;

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'women' | 'accessories';
  collection: string;
  imageUrl: string;
}

export interface HotItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  badge: string;
  features: string[];
  soldCount: number;
  rating: number;
  showOnHome: boolean;
}

export interface Store {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

// 图片地址处理：填 https:// 开头的网址就直接用；填文件名就自动指向 images 文件夹
function resolveImage(src: string): string {
  const value = src.trim();
  if (/^https?:\/\//i.test(value)) return value;
  return `${import.meta.env.BASE_URL}images/${value.replace(/^\/+/, '')}`;
}

export const heroSlides = content.heroSlides.map((slide, index) => ({
  id: String(index + 1),
  title: slide.title,
  subtitle: slide.subtitle,
  imageUrl: resolveImage(slide.image),
}));

export const hotItems: HotItem[] = content.hotItems.map((item, index) => ({
  id: String(index + 1),
  name: item.name,
  description: item.description,
  price: item.price,
  originalPrice: item.originalPrice,
  imageUrl: resolveImage(item.image),
  badge: item.badge,
  features: item.features,
  soldCount: item.soldCount,
  rating: item.rating,
  showOnHome: item.showOnHome,
}));

export const products: Product[] = content.products.map((product, index) => ({
  id: String(index + 1),
  name: product.name,
  description: product.description,
  price: product.price,
  category: product.category.trim() === '配饰' ? 'accessories' : 'women',
  collection: product.series,
  imageUrl: resolveImage(product.image),
}));

export const homeStory = {
  image: resolveImage(content.homeStory.image),
  eyebrow: content.homeStory.eyebrow,
  titleLine1: content.homeStory.titleLine1,
  titleLine2: content.homeStory.titleLine2,
  paragraphs: content.homeStory.paragraphs,
  stats: content.homeStory.stats,
};

export const timelineEvents: TimelineEvent[] = content.timelineEvents.map((event) => ({
  year: event.year,
  title: event.title,
  description: event.description,
}));

export const storyPage = {
  intro: content.storyPage.intro,
  values: content.storyPage.values,
  futureImage: resolveImage(content.storyPage.futureImage),
  futureTitle: content.storyPage.futureTitle,
  futureText: content.storyPage.futureText,
};

export const stores: Store[] = [
  {
    id: '1',
    name: `${siteConfig.brandName}（万佳批发市场店）`,
    country: '中国',
    city: siteConfig.city,
    address: siteConfig.address,
    latitude: 23.1291,
    longitude: 113.2644,
  },
];
