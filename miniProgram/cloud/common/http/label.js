import http from '../http.js'
export const get_label = (options) => {
  return http(options)
}

export const get_list = (options) => {
  return http(options)
}

export const update_like = (data) => {
  return http({
    name: 'update_like',
    data
  })
}

export const update_label = (data) => {
  return http({
    name: 'update_label',
    data
  })
}

export const get_detail = (data) => {
  return http({
    name: 'get_detail',
    data
  })
}

export const update_comment = (data) => {
  return http({
    name: 'update_comment',
    data
  })
}

export const get_comments = (data) => {
  return http({
    name: 'get_comments',
    data
  })
}

export const update_author = (data) => {
  return http({
    name: 'update_author',
    data
  })
}

export const update_thumbsup = (data) => {
  return http({
    name: 'update_thumbsup',
    data
  })
}

export const get_follow = (data) => {
  return http({
    name: 'get_follow',
    data
  })
}
