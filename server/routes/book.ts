import express from 'express'
import * as db from '../db/db.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { IBookData } from '../../models/book.ts'

const router = express.Router()

//get all books
router.get('/', async (req, res) => {
  try {
    const books = await db.getAllBooks()
    res.json(books)
  } catch (err) {
    res.status(500).send('Could not get books.')
  }
})

// TODO: use checkJwt as middleware
// POST /api/v1/books
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const { book } = req.body as { book: IBookData }
  const auth0Id = req.auth?.sub

  if (!book) {
    return res.status(400).send('Bad request')
  }

  if (!auth0Id) {
    return res.status(401).send('Unauthorized')
  }

  try {
    const [newBook] = await db.addBook(book.title, book.author, auth0Id)

    res.status(201).json({ book: newBook })
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
})

// TODO: use checkJwt as middleware
// patcher/api/v1/books
router.patch('/:id', checkJwt, async (req: JwtRequest, res) => {
  const { book } = req.body as { book: IBookData }
  const auth0Id = req.auth?.sub

  const id = Number(req.params.id)

  if (!book || !id) {
    return res.status(400).send('Bad request')
  }

  if (!auth0Id) {
    return res.status(401).send('Unauthorized')
  }

  try {
    await db.userCanEdit(id, auth0Id)
    const [updatedBook] = await db.updateBook(id, book.title, book.author)

    res.status(200).json({ book: updatedBook })
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof Error && error.message === 'Unauthorized') {
        return res
          .status(403)
          .send('Unauthorized: Only the user who added the book may update it')
      }
      res.status(500).send('Something went wrong')
    }
  }
})

// TODO: use checkJwt as middleware
// DELETE /api/v1/books
router.delete('/:id', checkJwt, async (req: JwtRequest, res) => {
  const id = Number(req.params.id)
  const auth0Id = req.auth?.sub

  if (!id) {
    return res.status(400).send('Bad request')
  }

  if (!auth0Id) {
    return res.status(401).send('Unauthorized')
  }

  try {
    await db.userCanEdit(id, auth0Id)
    await db.deleteBook(id)

    res.sendStatus(200)
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return res
        .status(403)
        .send('Unauthorized: Only the user who added the book may delete it')
    }
    res.status(500).send('Something went wrong')
  }
})

export default router
