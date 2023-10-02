export interface IBook {
  id: number
  title: string
  author: string
}

export interface IBookData {
  title: string
  author: string
}

export interface IBookSnakeCase {
  id?: number
  title: string
  author: string
  add_by?: string
}
