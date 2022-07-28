import {render as rtlRender, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
const Users = React.lazy(() => import('./views/Users'));
const UserDetails = React.lazy(() => import('./views/UserDetails'))
import * as React from 'react'
import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
  useLocation,
} from 'react-router-dom'
import App from './App'
const render = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)

  return rtlRender(ui, {wrapper: Router})
}

test('full app rendering/navigating', () => {
  render(<App />)
  expect(screen.getByTestId('app')).toBeInTheDocument()
})

test('/users', () => {
  render(<Users />, {route: '/users'})

  expect(screen.getByTestId('sort by')).toBeInTheDocument()
})

test('/users/2', () => {
  const route = '/users/2'
  render(< UserDetails/>, {route})

  // avoid using test IDs when you can
  expect(screen.getByTestId('userDetails')).toHaveTextContent(route)
})

