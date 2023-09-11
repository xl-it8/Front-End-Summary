import request from "@/utils/request"

export function getList () {
  return request({
    url: "news/list"
  })
}

export function getHeroList () {
  return request({
    url: "hero/list"
  })
}

export function getNewsDetail (id:string) {
  return request({
    url: "news/" + id
  })
}

export function getHeroDetail (id:string) {
  return request({
    url: "hero/" + id
  })
}
