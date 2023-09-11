import Http from '../utils/http'

export const getNewsList =()=>{
    return Http.get('/api/news_latest')
}


export const getNewsDetail =(id: string)=>{
    return Http.get('/api/news_info',{ params: {
        id
    }})
}

export const getStoryExtra =(id: string)=>{
    return Http.get('/api/story_extra', {params: {
        id
    }})
}


// 发送验证码
export  const sendPhoneCode = (phone:string) => {
    return Http.post('/api/phone_code', {
        phone
    });
};

// 登录/注册
export const login = (phone:string, code:string) => {
    return Http.post('/api/login', {
        phone,
        code
    });
};


// 获取登录者信息
export const queryUserInfo = () => Http.get('/api/user_info');

// 收藏新闻
export const store2 = (newsId:string) => {
    return Http.post('/api/store', { newsId });
};

// 移除收藏
export const storeRemove = (id:string) => {
    return Http.get('/api/store_remove', {
        params: {
            id
        }
    });
};

// 获取收藏列表
export const storeList = () => Http.get('/api/store_list');

// 图片上传「要求FormData格式」
export const upload = (file:File) => {
    let fm = new FormData();
    fm.append('file', file);
    return Http.post('/api/upload', fm);
};

// 修改个人信息
export const userUpdate = (username:string, pic:string) => {
    return Http.post('/api/user_update', {
        username,
        pic
    });
};
