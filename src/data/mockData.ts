export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'women' | 'men' | 'accessories';
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
    id: '4',
    name: '修身西装',
    description: '精致剪裁的黑色修身西装',
    price: 3499,
    category: 'men',
    collection: 'Autumn/Winter 2024',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=black%20tailored%20suit%20men%20fashion%20photography%20elegant&image_size=portrait_4_3'
  },
  {
    id: '5',
    name: '羊毛毛衣',
    description: '高品质纯羊毛针织毛衣',
    price: 1899,
    category: 'men',
    collection: 'Autumn/Winter 2024',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=men%20wool%20knit%20sweater%20fashion%20photography%20minimalist&image_size=portrait_4_3'
  },
  {
    id: '6',
    name: '休闲皮鞋',
    description: '意大利手工制作休闲皮鞋',
    price: 2499,
    category: 'men',
    collection: 'Spring/Summer 2024',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Italian%20leather%20casual%20shoes%20men%20fashion%20photography&image_size=portrait_4_3'
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
    name: '北京旗舰店',
    country: '中国',
    city: '北京',
    address: '北京市朝阳区三里屯太古里北区N3-28',
    latitude: 39.9391,
    longitude: 116.4490
  },
  {
    id: '2',
    name: '上海精品店',
    country: '中国',
    city: '上海',
    address: '上海市黄浦区淮海中路999号环贸iapm商场L1层',
    latitude: 31.2304,
    longitude: 121.4737
  },
  {
    id: '3',
    name: '首尔专卖店',
    country: '韩国',
    city: '首尔',
    address: '首尔特别市江南区新沙洞林荫道85-12',
    latitude: 37.5172,
    longitude: 127.0473
  },
  {
    id: '4',
    name: '东京银座店',
    country: '日本',
    city: '东京',
    address: '东京都中央区银座3丁目10-1',
    latitude: 35.6762,
    longitude: 139.6503
  },
  {
    id: '5',
    name: '迪拜购物中心店',
    country: '阿联酋',
    city: '迪拜',
    address: '迪拜购物中心一层，近迪拜水族馆',
    latitude: 25.2048,
    longitude: 55.2708
  },
  {
    id: '6',
    name: '伦敦邦德街店',
    country: '英国',
    city: '伦敦',
    address: '伦敦邦德街28号',
    latitude: 51.5133,
    longitude: -0.1423
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    year: '2015',
    title: '品牌创立',
    description: 'Bobby Fashion在上海创立，开启时尚之旅'
  },
  {
    year: '2017',
    title: '首次亮相时装周',
    description: '受邀参加上海时装周，发布首个秋冬系列'
  },
  {
    year: '2019',
    title: '拓展国际市场',
    description: '进军韩国市场，开设首尔旗舰店'
  },
  {
    year: '2021',
    title: '数字化转型',
    description: '推出线上商城，实现全渠道销售'
  },
  {
    year: '2023',
    title: '全球布局',
    description: '入驻西亚市场，迪拜门店盛大开业'
  },
  {
    year: '2024',
    title: '品牌升级',
    description: '全新品牌形象发布，开启时尚新篇章'
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
    title: 'Global Style',
    subtitle: '连接世界时尚',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=international%20fashion%20models%20diverse%20styles%20luxury%20brand%20campaign&image_size=landscape_16_9'
  }
];