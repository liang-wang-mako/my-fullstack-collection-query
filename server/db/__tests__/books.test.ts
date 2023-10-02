import { it, describe, expect, beforeEach } from 'vitest'
import connection from '../connection'
import * as db from '../db'

beforeEach(async () => {
  await connection.migrate.rollback()
  await connection.migrate.latest()
  await connection.seed.run()
})

describe('Add a Book', () => {
  it('add a book to the table books', async () => {

    const auth0Id = 'auth0123'
    const newBookData = {
      title: 'Test Book Tile',
      author: 'Test Book Author',
    }

    const [addedBook] = await db.addBook(
      newBookData.title,
      newBookData.author,
      auth0Id
    )

    expect(addedBook.title).toBe(newBookData.title)
    expect(addedBook.author).toBe(newBookData.author)
    expect(addedBook.id).not.toBe(null)
  })
})
