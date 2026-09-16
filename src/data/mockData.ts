export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'women' | 'accessories';
  collection: string;
  imageUrl: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  season: string;
  imageUrl: string;
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

export const products: Product[] = [
  {
    id: '1',
    name: '丝绒长裙',
    description: '优雅的黑色丝绒长裙，展现女性柔美气质',
    price: 2999,
    category: 'women',
    collection: 'Autumn/Winter 2024',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20black%20velvet%20long%20dress%20fashion%20photography%20studio%20lighting&image_size=portrait_4_3'
  },
  {
    id: '2',
    name: '羊绒大衣',
    description: '经典驼色羊绒大衣，温暖与时尚并存',
    price: 5999,
    category: 'women',
    collection: 'Autumn/Winter 2024',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=classic%20camel%20cashmere%20coat%20fashion%20photography%20minimalist&image_size=portrait_4_3'
  },
  {
    id: '3',
    name: '真丝衬衫',
    description: '简约白色真丝衬衫，百搭单品',
    price: 1299,
    category: 'women',
    collection: 'Spring/Summer 2024',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=white%20silk%20blouse%20elegant%20fashion%20photography&image_size=portrait_4_3'
  },
  {
    id: '7',
    name: '真皮手袋',
    description: '精致真皮手提包，彰显品味',
    price: 4599,
    category: 'accessories',
    collection: 'Autumn/Winter 2024',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20leather%20handbag%20fashion%20accessory%20photography&image_size=portrait_4_3'
  },
  {
    id: '8',
    name: '时尚围巾',
    description: '纯羊绒时尚围巾',
    price: 1299,
    category: 'accessories',
    collection: 'Autumn/Winter 2024',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cashmere%20fashion%20scarf%20accessory%20photography%20elegant&image_size=portrait_4_3'
  },
  {
    id: '9',
    name: '精致腕表',
    description: '瑞士机芯精致腕表',
    price: 8999,
    category: 'accessories',
    collection: 'Spring/Summer 2024',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20swiss%20watch%20fashion%20accessory%20photography&image_size=portrait_4_3'
  }
];

export const collections: Collection[] = [
  {
    id: '1',
    name: 'Autumn/Winter 2024',
    description: '秋冬系列，温暖与时尚的完美结合',
    season: 'Autumn/Winter',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fashion%20collection%20autumn%20winter%202024%20elegant%20dark%20tones&image_size=landscape_16_9'
  },
  {
    id: '2',
    name: 'Spring/Summer 2024',
    description: '春夏系列，轻盈与活力的诠释',
    season: 'Spring/Summer',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fashion%20collection%20spring%20summer%202024%20light%20colors%20fresh&image_size=landscape_16_9'
  }
];

export const stores: Store[] = [
  {
    id: '1',
    name: '欧蜜儿（万佳批发市场店）',
    country: '中国',
    city: '广州',
    address: '广州市万佳批发市场2街',
    latitude: 23.1291,
    longitude: 113.2644
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    year: '2009',
    title: '品牌创立',
    description: '欧蜜儿在广州创立，开启时尚女装之旅'
  },
  {
    year: '2012',
    title: '扎根万佳',
    description: '门店入驻广州万佳批发市场2街，用心经营每一位顾客'
  },
  {
    year: '2015',
    title: '口碑成长',
    description: '凭借优质款式与实在价格，积累大批回头客'
  },
  {
    year: '2019',
    title: '品类升级',
    description: '建立稳定供应链，女装与配饰品类全面丰富'
  },
  {
    year: '2022',
    title: '线上拓展',
    description: '开通微信咨询与线上订购渠道，服务更多顾客'
  },
  {
    year: '2026',
    title: '品牌焕新',
    description: '全新品牌形象上线，17年坚守，继续专注品质女装'
  }
];

export const heroSlides = [
  {
    id: '1',
    title: 'Autumn/Winter 2024',
    subtitle: '探索冬日优雅',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=high%20fashion%20model%20wearing%20elegant%20winter%20coat%20dark%20background%20studio%20lighting&image_size=landscape_16_9'
  },
  {
    id: '2',
    title: 'Spring/Summer 2024',
    subtitle: '感受春日轻盈',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=high%20fashion%20model%20wearing%20light%20spring%20dress%20soft%20lighting%20elegant&image_size=landscape_16_9'
  },
  {
    id: '3',
    title: 'Since 2009',
    subtitle: '十七年专注品质女装',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20women%20fashion%20clothing%20boutique%20warm%20lighting%20luxury%20style&image_size=landscape_16_9'
  }
];
