// .d.ts 只有类型声明
export type ListData = {
  name: string;
  newsList?: {
    _id: string;
    categoryName: string;
    title: string;
    createdAt: string;
  }[];
  heroList?: { _id: string; name: string; avatar: string }[];
};

// 英雄详情接口
export interface IHero {
  avatar: string;
  banner: string;
  battleTips: string;
  teamTips: string;
  title: string;
  useTips: string;
  _id: string;
  categories: { name: string }[];
  items1: {icon:string;name:string }[];
  items2: {icon:string;name:string }[];
  name: string;
  partners: { hero: {avatar:string}; description: string }[];
  scopes: { difficult: number; dead: number; skills: number; attach: number };
  skills: { icon: string;name:string;description
:string }[];
}
