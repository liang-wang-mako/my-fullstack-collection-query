import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { useBooks } from '../hooks'
import { IBook, IBookData } from '../../models/book.ts'
import { ErrorMessage } from './Styled.tsx'
import AddBookForm from './AddBookForm.tsx'
import SelectedBookForm from './SelectedBookForm.tsx'

type FormState =
  | {
      selectedBook: IBook
      show: 'selected'
    }
  | {
      selectedBook: null
      show: 'add' | 'none'
    }

export default function Books() {
  const { getAccessTokenSilently } = useAuth0()
  const [error, setError] = useState('')
  const [form, setForm] = useState<FormState>({
    selectedBook: null,
    show: 'none',
  })

  const books = useBooks()

  const handleMutationSuccess = () => {
    handleCloseForm()
    setError('')
  }

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error.message)
    } else {
      setError('Unknown error')
    }
  }

  const mutationOptions = {
    onSuccess: handleMutationSuccess,
    onError: handleError,
  }

  const handleAdd = async (book: IBookData) => {
    // TODO: use getAccessTokenSilently to get an access token
    const token = await getAccessTokenSilently()
    
    // TODO: pass access token to mutate function
    books.add.mutate({ book, token }, mutationOptions)
  }

  const handleUpdate = async (book: IBook) => {
    // TODO: use getAccessTokenSilently to get an access token
    const token = await getAccessTokenSilently()
    // TODO: pass access token to mutate function
    books.update.mutate({ book, token }, mutationOptions)
  }

  const handleDelete = async (id: number) => {
    // TODO: use getAccessTokenSilently to get an access token
    const token = await getAccessTokenSilently()
    // TODO: pass access token to mutate function
    books.delete.mutate({ id, token }, mutationOptions)
  }

  const hideError = () => {
    setError('')
  }

  const handleOpenAddForm = () => {
    setForm({ show: 'add', selectedBook: null })
  }

  const handleCloseForm = () => {
    setForm({ show: 'none', selectedBook: null })
  }

  const handleSelectBook = (book: IBook) => {
    setForm({ show: 'selected', selectedBook: book })
  }

  if (books.isLoading) {
    let failures = ''
    if (books.failureCount > 0) {
      failures = ` (failed ${books.failureCount} times)`
    }
    return <div>Loading... {failures}</div>
  }

  let fetchStatus = ''
  if (books.add.isLoading) fetchStatus = 'Adding...'
  if (books.update.isLoading) fetchStatus = 'Updating...'
  if (books.delete.isLoading) fetchStatus = 'Deleting...'
  if (books.isRefetching) fetchStatus = 'Refreshing...'

  if (books.error instanceof Error) {
    return (
      <ErrorMessage>Failed to load books: {books.error.message}</ErrorMessage>
    )
  }

  return (
    <>
      {error !== '' && (
        <ErrorMessage onClick={hideError}>Error: {error}</ErrorMessage>
      )}
      {fetchStatus !== '' && <div>{fetchStatus}</div>}
      <ul>
        {books.status === 'success' &&
          books.data.map((book) => (
            <li key={book.id}>
              <button onClick={() => handleSelectBook(book)}>
                {book.title}
              </button>
            </li>
          ))}
      </ul>
      {form.show === 'add' ? (
        <AddBookForm onAdd={handleAdd} onClose={handleCloseForm} />
      ) : (
        <button onClick={handleOpenAddForm}>Add Book</button>
      )}
      {form.show === 'selected' && (
        <SelectedBookForm
          key={form.selectedBook.id}
          book={form.selectedBook}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onClose={handleCloseForm}
        />
      )}
    </>
  )
}
