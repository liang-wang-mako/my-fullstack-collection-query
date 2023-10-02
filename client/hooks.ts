import { MutationFunction, useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import * as API from './apis/apiClient'

export function useBooks() {
  const query = useQuery({
    queryKey: ['books'],
    queryFn: API.getAllBooks,
  })

  return {
    ...query,
    update: useUpdateBook(),
    delete: useDeleteBook(),
    add: useAddBook(),
  }
}

export function useBookMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['books'])
    },
  })

  return mutation
}

export function useUpdateBook() {
  return useBookMutation(API.updateBook)
}

export function useDeleteBook() {
  return useBookMutation(API.deleteBook)
}

export function useAddBook() {
  return useBookMutation(API.addBook)
}
