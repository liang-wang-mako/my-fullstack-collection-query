import { useAuth0 } from '@auth0/auth0-react'

const useIsAuthenticated = () => {
  // TODO: call the useAuth0 hook, destructure and return isAuthenticated
  const { isAuthenticated } = useAuth0()
  console.log('isAuthenticated: ' + isAuthenticated)
  return isAuthenticated
}
interface IProps {
  children: React.ReactNode
}
export function IfAuthenticated(props: IProps) {
  console.log('Authenticated')
  const { children } = props
  return useIsAuthenticated() ? <>{children}</> : null
}

export function IfNotAuthenticated(props: IProps) {
  console.log('Not Authenticated')
  const { children } = props
  return !useIsAuthenticated() ? <>{children}</> : null
}
