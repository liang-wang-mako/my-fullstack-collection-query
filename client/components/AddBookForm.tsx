import { IBookData } from '../../models/book.ts'
import { useState } from 'react'
import { GridForm, ColOne, ColTwoText, Button } from './Styled.tsx'

interface IProps {
  onAdd: (book: IBookData) => void
  onClose: () => void
}

const emptyBook: IBookData = {
  title: '',
  author: '',
}

export default function AddBookForm({ onAdd, onClose }: IProps) {
  const [newBook, setNewBook] = useState(emptyBook)

  const { title: addingTitle, author: addingAuthor } = newBook

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewBook({
      ...newBook,
      [name]: value,
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onAdd(newBook)
  }

  return (
    <>
      <h2>Add New Book</h2>
      <GridForm onSubmit={handleSubmit}>
        <ColOne htmlFor="title">Title:</ColOne>
        <ColTwoText
          type="text"
          name="title"
          id="title"
          value={addingTitle}
          onChange={handleChange}
        />

        <ColOne htmlFor="author">Author:</ColOne>
        <ColTwoText
          type="text"
          name="author"
          id="author"
          value={addingAuthor}
          onChange={handleChange}
        />

        <Button
          type="submit"
          disabled={addingTitle === '' || addingAuthor === ''}
        >
          Add Book
        </Button>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
      </GridForm>
    </>
  )
}
