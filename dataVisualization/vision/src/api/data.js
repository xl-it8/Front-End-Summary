import request from '@/utils/request'

export function getSeller() {
  return request({
    url: 'seller'
  })
}

export function getTrend() {
  return request({
    url: 'trend'
  })
}

export function getMap() {
  return request({
    url: 'map'
  })
}

export function getRank() {
  return request({
    url: 'rank'
  })
}
export function getHot() {
  return request({
    url: 'hotProduct'
  })
}

export function getStock() {
  return request({
    url: 'stock'
  })
}
