import { Route, createRoutesFromElements } from 'react-router-dom'

import AppLayout from './components/AppLayout.tsx'
import Books from './components/Books.tsx'

export const routes = createRoutesFromElements(
  <Route element={<AppLayout />}>
    <Route index element={<Books />} />
  </Route>
)
