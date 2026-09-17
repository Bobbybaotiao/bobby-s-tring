/* ====================================================================
 *  📝 网站内容总文件 —— 以后更新网站，只需要修改这一个文件！
 * ====================================================================
 *
 *  【手机或电脑上的更新步骤】
 *  1. 用浏览器打开这个地址（建议收藏）：
 *     https://github.com/Bobbybaotiao/bobby-s-tring/blob/main/src/data/mockData.ts
 *  2. 点右上角的铅笔图标 ✏️（Edit this file）
 *  3. 修改下面的文字、价格，或按模板添加新商品
 *  4. 点页面右上角绿色按钮「Commit changes」保存
 *  5. 等待 1～2 分钟，网站会自动更新（不需要做其他任何操作）
 *
 *  【格式规则（很重要，改错格式网站会更新失败）】
 *  - 文字必须用英文单引号 ' ' 包住，例如：name: '真丝衬衫'
 *    文字本身里面不要出现英文单引号；价格数字不要加引号也不要加 ¥
 *  - 每一段内容用大括号 { } 包住，各段之间用逗号隔开
 *  - 以 // 开头的行是说明，不会显示在网站上
 *  - 如果保存后网站没变化，是格式有误，把刚才的修改再检查一遍即可
 *    （网站会继续保持修改前的样子，不会坏）
 *
 *  【怎么换商品照片】
 *  1. 在 GitHub 打开 public/images 文件夹，点「Add file → Upload files」
 *     上传照片（文件名建议用英文或数字，例如 fengyi.jpg），再点 Commit changes
 *  2. 回到本文件，把图片那一行填成文件名：image: 'fengyi.jpg'
 *     （直接填写 https:// 开头的网络图片网址也可以）
 *
 *  【怎么添加新商品 / 爆款】
 *  - 复制一整段 { ... }（连同大括号），紧挨着粘贴一份，改掉里面的内容即可
 *  【怎么下架商品】
 *  - 直接删掉那一整段 { ... }，或给该段每一行前面都加上 //
 *
 * ==================================================================== */


/* ====================================================================
 *  ① 店铺基本信息（改联系方式、地址、营业时间，改这里）
 * ==================================================================== */
export const siteConfig = {
  brandName: '欧蜜儿',              // 品牌名称（显示在网页最上方和页脚）
  foundedYear: 2009,               // 品牌创立年份
  wechat: 'ACY829',                // 微信号
  phone: '17373353281',            // 联系电话（只填数字）
  address: '广州万佳批发市场2街',    // 门店地址
  city: '广州',                     // 所在城市
  hours: '周一至周日 9:00 - 18:00', // 营业时间
  footerIntro: '扎根广州17年的时尚女装品牌，专注品质女装，用心服务每一位顾客。', // 页脚品牌简介
  storeIntro: '欧蜜儿门店位于广州万佳批发市场，17年实体经营，欢迎您到店试穿选购，我们将为您提供贴心的一对一服务。', // 首页门店区块介绍
  contactIntro: '无论您是想了解产品、寻找门店，还是洽谈合作，我们都期待与您取得联系', // 联系页顶部说明
};


/* ====================================================================
 *  ② 首页轮播大图（首页自动切换的几张大图：大标题、小标题、图片）
 * ==================================================================== */
const heroSlidesData: Array<{ title: string; subtitle: string; image: string }> = [
  {
    title: 'Autumn/Winter 2024',   // 大标题
    subtitle: '探索冬日优雅',         // 小标题
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=high%20fashion%20model%20wearing%20elegant%20winter%20coat%20dark%20background%20studio%20lighting&image_size=landscape_16_9', // 图片（网址或 images 文件夹里的文件名）
  },
  {
    title: 'Spring/Summer 2024',
    subtitle: '感受春日轻盈',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=high%20fashion%20model%20wearing%20light%20spring%20dress%20soft%20lighting%20elegant&image_size=landscape_16_9',
  },
  {
    title: 'Since 2009',
    subtitle: '十七年专注品质女装',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20women%20fashion%20clothing%20boutique%20warm%20lighting%20luxury%20style&image_size=landscape_16_9',
  },
];


/* ====================================================================
 *  ③ 当季爆款（首页爆款区和「当季爆款」页面共用这一份）
 *  - showOnHome: true 表示同时显示在首页；改成 false 就只在爆款页面显示
 *  - rating 填 1～5 的数字（可以填 4.9 这种小数），代表星级
 * ==================================================================== */
const hotItemsData: Array<{
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  image: string;
  badge: string;
  features: string[];
  soldCount: number;
  rating: number;
  showOnHome: boolean;
}> = [
  {
    name: '经典风衣外套',
    price: 450,                    // 现价（只填数字）
    originalPrice: 680,            // 原价（页面会显示划线价和省了多少钱）
    description: '精选优质面料，剪裁利落，经典风衣版型，适合多种场合穿着。细节考究，彰显品质生活。',
    image: 'item1.jpg',            // 图片：已上传到 public/images 文件夹的文件名
    badge: '人气爆款',              // 图片左上角的角标文字
    features: ['优质面料', '经典版型', '多色可选', '四季可穿'], // 特点标签
    soldCount: 1280,               // 已售数量（页面显示"已售 1280+件"）
    rating: 4.9,                   // 星级（1～5）
    showOnHome: true,              // true=首页也展示；false=只在爆款页展示
  },
  {
    name: '优雅针织衫',
    price: 500,
    originalPrice: 750,
    description: '柔软舒适的针织面料，简约设计风格，修饰身形，百搭单品，轻松搭配各种造型。',
    image: 'item2.jpg',
    badge: '热销TOP1',
    features: ['柔软亲肤', '修身剪裁', '百搭单品', '透气舒适'],
    soldCount: 2156,
    rating: 4.8,
    showOnHome: true,
  },
  {
    name: '时尚休闲套装',
    price: 550,
    originalPrice: 820,
    description: '一套搞定日常穿搭，面料挺括有型，休闲与时尚的完美结合，街头潮流必备之选。',
    image: 'item3.jpg',
    badge: '限量发售',
    features: ['套装组合', '挺括有型', '潮流设计', '舒适自在'],
    soldCount: 893,
    rating: 4.7,
    showOnHome: true,
  },
];


/* ====================================================================
 *  ④ 首页「品牌故事」区块（图片、标题、几段话、数据）
 * ==================================================================== */
export const homeStory = {
  image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fashion%20designer%20studio%20elegant%20minimalist%20workspace%20creative&image_size=portrait_4_3', // 配图（网址或文件名）
  eyebrow: 'Our Story',            // 图片旁的小英文
  titleLine1: '匠心独运',           // 大标题第一行
  titleLine2: '引领时尚',           // 大标题第二行（金色字）
  paragraphs: [                    // 正文段落，想加一段就照着再加一行 '...',
    '欧蜜儿创立于2009年，源自对时尚的热爱与追求。我们相信，真正的时尚不仅仅是外表的华丽，更是内在气质的彰显。',
    '17年来，我们扎根广州万佳批发市场2街，从选材到剪裁，从细节到整体，始终坚持高标准、严要求，只为呈现最完美的时尚体验。',
    '欧蜜儿专注品质女装，以实在的价格和贴心的服务，赢得了一批又一批顾客的信赖与回头。',
  ],
  stats: [                         // 三个数据展示
    { value: '17年', label: '品牌沉淀' },
    { value: '10000+', label: '累计顾客' },
    { value: '98%', label: '好评回头率' },
  ],
};


/* ====================================================================
 *  ⑤ 全部商品（「产品系列」页面和首页「当季新品」）
 *  - category（分类）只能填两个值：'女装' 或 '配饰'
 *  - series（系列）可以自由填，例如 '2026 秋冬系列'
 *  - 首页「当季新品」自动取列表里最前面的 6 件
 * ==================================================================== */
const productsData: Array<{
  name: string;
  description: string;
  price: number;
  category: string;
  series: string;
  image: string;
}> = [
  {
    name: '丝绒长裙',
    description: '优雅的黑色丝绒长裙，展现女性柔美气质',
    price: 2999,
    category: '女装',
    series: '2024 秋冬系列',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20black%20velvet%20long%20dress%20fashion%20photography%20studio%20lighting&image_size=portrait_4_3',
  },
  {
    name: '羊绒大衣',
    description: '经典驼色羊绒大衣，温暖与时尚并存',
    price: 5999,
    category: '女装',
    series: '2024 秋冬系列',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=classic%20camel%20cashmere%20coat%20fashion%20photography%20minimalist&image_size=portrait_4_3',
  },
  {
    name: '真丝衬衫',
    description: '简约白色真丝衬衫，百搭单品',
    price: 1299,
    category: '女装',
    series: '2024 春夏系列',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=white%20silk%20blouse%20elegant%20fashion%20photography&image_size=portrait_4_3',
  },
  {
    name: '真皮手袋',
    description: '精致真皮手提包，彰显品味',
    price: 4599,
    category: '配饰',
    series: '2024 秋冬系列',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20leather%20handbag%20fashion%20accessory%20photography&image_size=portrait_4_3',
  },
  {
    name: '时尚围巾',
    description: '纯羊绒时尚围巾',
    price: 1299,
    category: '配饰',
    series: '2024 秋冬系列',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cashmere%20fashion%20scarf%20accessory%20photography%20elegant&image_size=portrait_4_3',
  },
  {
    name: '精致腕表',
    description: '瑞士机芯精致腕表',
    price: 8999,
    category: '配饰',
    series: '2024 春夏系列',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20swiss%20watch%20fashion%20accessory%20photography&image_size=portrait_4_3',
  },
];


/* ====================================================================
 *  ⑥ 发展历程（「品牌故事」页面的时间轴，按年份从早到晚排列）
 * ==================================================================== */
export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: '2009',
    title: '品牌创立',
    description: '欧蜜儿在广州创立，开启时尚女装之旅',
  },
  {
    year: '2012',
    title: '扎根万佳',
    description: '门店入驻广州万佳批发市场2街，用心经营每一位顾客',
  },
  {
    year: '2015',
    title: '口碑成长',
    description: '凭借优质款式与实在价格，积累大批回头客',
  },
  {
    year: '2019',
    title: '品类升级',
    description: '建立稳定供应链，女装与配饰品类全面丰富',
  },
  {
    year: '2022',
    title: '线上拓展',
    description: '开通微信咨询与线上订购渠道，服务更多顾客',
  },
  {
    year: '2026',
    title: '品牌焕新',
    description: '全新品牌形象上线，17年坚守，继续专注品质女装',
  },
];


/* ====================================================================
 *  ⑦「品牌故事」页面的文字（开头介绍、三个理念、底部展望）
 * ==================================================================== */
export const storyPage = {
  intro: [   // 页面顶部介绍（可以写多段）
    '欧蜜儿的旅程始于2009年的广州，源于对时尚的热爱与追求。',
    '17年来，我们相信真正的时尚是一种生活态度，是对美的不懈追求。',
  ],
  values: [  // 三张理念卡片（编号 01/02/03 会自动生成）
    { title: '设计理念', text: '融合东方美学与西方设计，创造独特的时尚风格' },
    { title: '品质承诺', text: '精选顶级面料，精湛工艺，只为呈现最完美的品质' },
    { title: '用心服务', text: '扎根广州万佳批发市场，17年如一日，服务好每一位顾客' },
  ],
  futureImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fashion%20runway%20show%20elegant%20models%20professional%20lighting%20luxury%20brand&image_size=landscape_16_9', // 底部大图
  futureTitle: '展望未来',
  futureText: '我们将继续深耕品质女装，以更美的款式、更实在的价格，回报每一位顾客的信赖',
};


/* ====================================================================
 *  👇 以下为系统转换代码，日常更新内容不需要修改 👇
 * ==================================================================== */

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

// 图片地址处理：填 https:// 开头的网址就直接用；填文件名就自动指向 public/images 文件夹
function resolveImage(src: string): string {
  const value = src.trim();
  if (/^https?:\/\//i.test(value)) return value;
  return `${import.meta.env.BASE_URL}images/${value.replace(/^\/+/, '')}`;
}

export const heroSlides = heroSlidesData.map((slide, index) => ({
  id: String(index + 1),
  title: slide.title,
  subtitle: slide.subtitle,
  imageUrl: resolveImage(slide.image),
}));

export const hotItems: HotItem[] = hotItemsData.map((item, index) => ({
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

export const products: Product[] = productsData.map((product, index) => ({
  id: String(index + 1),
  name: product.name,
  description: product.description,
  price: product.price,
  category: product.category.trim() === '配饰' ? 'accessories' : 'women',
  collection: product.series,
  imageUrl: resolveImage(product.image),
}));

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
