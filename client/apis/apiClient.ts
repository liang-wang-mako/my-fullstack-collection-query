import request from 'superagent'
import { IBookData, IBook } from '../../models/book.ts'

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getAllBooks(): Promise<IBook[]> {
  await sleep(2000)
  const response = await request.get('/api/v1/books')
  return response.body as IBook[]
}

interface IAddBookFunction {
  book: IBookData
  token: string
}
export async function addBook({
  book,
  token,
}: IAddBookFunction): Promise<void> {
 
  await request
    .post('/api/v1/books')
    .set('Authorization', `Bearer ${token}`)
    .send({ book })
    .then((res) => res.body.book)
    .catch(logError)
}

interface IUpdateBookFunction {
  book: IBook
  token: string
}
export async function updateBook({
  book,
  token,
}: IUpdateBookFunction): Promise<IBook> {
  return request
    .patch(`/api/v1/books/${book.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ book })
    .then((res) => res.body.book)
    .catch(logError)
}

interface IDeleteBookFunction {
  id: number
  token: string
}

export async function deleteBook({id, token}: IDeleteBookFunction): Promise<void> {
  await sleep(2000)
  return request
    .delete(`/api/v1/books/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
    .catch(logError)
}

function logError(err: Error) {
  
  if (err.message === 'Username Taken') {
    throw new Error('Username already taken - please choose another')
  } else if (err.message === 'Forbidden') {
    throw new Error('Only the user who added the book may update and delete it')
  } else {
    throw err
  }
}
