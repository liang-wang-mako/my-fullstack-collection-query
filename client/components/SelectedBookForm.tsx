import { IBook } from '../../models/book.ts'

import { useState } from 'react'

import { GridForm, ColOne, ColTwoText, Button } from './Styled.tsx'

interface IProps {
  book: IBook
  onUpdate: (updatedBook: IBook) => void
  onDelete: (id: number) => void
  onClose: () => void
}

export default function SelectedBookForm({ book, onUpdate, onDelete, onClose }: IProps) {
  const [updatedBook, setUpdatedBook] = useState(book)

  const { title: editingTitle, author: editingAuthor } = updatedBook
  const { title: currentTitle } = book

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUpdatedBook({
      ...updatedBook,
      [name]: value,
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onUpdate(updatedBook)
  }

  const handleDeleteButtonClick = () => {
    onDelete(book.id)
  }

  return (
    <>
      <h2>Selected: {currentTitle}</h2>
      <GridForm onSubmit={handleSubmit}>
        <ColOne htmlFor="title">Title:</ColOne>
        <ColTwoText
          type="text"
          name="title"
          id="title"
          value={editingTitle}
          onChange={handleTextChange}
        />

        <ColOne htmlFor="author">Author:</ColOne>
        <ColTwoText
          type="text"
          name="author"
          id="author"
          value={editingAuthor}
          onChange={handleTextChange}
        />

        <Button
          type="submit"
          disabled={editingTitle === '' || editingAuthor === ''}
        >
          Update Book
        </Button>
        <Button type="button" onClick={handleDeleteButtonClick}>
          Delete Book
        </Button>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
      </GridForm>
    </>
  )
}


