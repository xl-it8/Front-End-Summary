
import request from '@/utils/request'


export function createCategory(url, data) {
    console.log(url)
    return request({
        url,
        method: 'POST',
        data
    })
}

export function findCategoryList(url, params) {
    return request({
        url,
        method: 'GET',
        params
    })
}

export function findById(url, id) {
    return request({
        url: url + id,
        method: 'GET',
    })
}

export function editCategory(url, data) {
    return request({
        url,
        method: 'PUT',
        data
    })
}

export function deleteCategory(id, url) {
    return request({
        url: url + id,
        method: 'DELETE',
    })
}

export function upload(data) {
    return request({
        url: 'article/upload',
        method: 'post',
        data
    })
}