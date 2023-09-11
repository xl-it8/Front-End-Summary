type Idata = {
  title: string;
  content: string;
  label: string[];
}[];

type Ipromise<M> = Promise<Idata2<M>>;

interface Idata2<T> {
  status: string;
  message: T[] | T;
}

interface WallData {
  type: number;
  message?: string;
  userId: string; //创建者id
  name: string;
  moment: string;
  label: number;
  color: number;
  imgurl?: string;
}

interface FeedbackData {
  wallId: number;
  userId: string;
  type: number;
  moment: string;
}
interface CommentData {
  wallId: number;
  userId: string;
  imgurl: string;
  comment: string;
  name: string;
  moment: string;
}
interface WallList extends WallData {
  islike?: number;
  report?: number;
  revoke?: number;
  like?: number;
  comcount: number;
}

interface WallPageData {
  page: number;
  pageSize: number;
  label: number;
  type: number;
  useId: string;
}

interface WallPageData {
  page: number;
  pageSize: number;
  label: number;
  type: number;
  useId: string;
}

interface CommentPageData {
  page: number;
  pageSize: number;
  wallId: number;
}

// interface CommentData {
//   id: number;
//   wallId: number;
//   userId: string;
//   imgurl: string;
//   comment: string;
//   name: string;
//   moment: string;
// }
