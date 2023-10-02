import { IBook } from '../../models/book.ts'
import { IBookSnakeCase } from '../model/book.ts'
import db from './connection.ts'

export async function getAllBooks(): Promise<IBook[]> {
  return db('books').select('*')
}

export async function addBook(
  title: string,
  author: string,
  addBy: string
): Promise<IBook[]> {
  return db('books')
    .insert({ title, author, add_by: addBy })
    .returning(['id', 'title', 'author'])
}

export async function updateBook(
  id: number,
  title: string,
  author: string
): Promise<IBook[]> {
  return await db('books')
    .where({ id })
    .update({ title, author })
    .returning(['id', 'title', 'author'])
}

export async function deleteBook(id: number): Promise<void> {
  await db('books').where({ id }).delete()
}

export async function userCanEdit(
  bookId: number,
  auth0Id: string
) {
  return db('books')
    .where({ id: bookId })
    .first()
    .then((book: IBookSnakeCase) => {
      if (book.add_by !== auth0Id) {
        throw new Error('Unauthorized')
      }
    })
}
