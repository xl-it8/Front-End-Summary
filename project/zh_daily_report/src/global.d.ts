import {
  type Params,
  type NavigateFunction,
  type Location,
} from 'react-router-dom'

declare interface RouteProps {
  navigate: NavigateFunction
  location: Location
  usp: URLSearchParams
  params: Readonly<Params<string>>
}

export type Tarticle ={
  id: string
  images?: string[]
  image?: string
  url?: string
  title?: string
  hint?: string
}

export type INewsDetail ={
  // id: string
  // images: string[]
  // image?: string
  // url: string
  // title: string
  // hint: string
}


