import {Outlet} from 'react-router-dom'
import Nav from './Nav.tsx'

function AppLayout() {
  return (
    <>
    <Nav />
    <main>
     <Outlet />
    </main>
    </>
  )
}

export default AppLayout
