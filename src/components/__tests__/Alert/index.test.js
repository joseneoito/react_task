import {render, cleanup, screen } from '@testing-library/react'
import ButtonAppBar from '../../Navbar'
import {BrowserRouter as Router} from 'react-router-dom';
test('should render Navbar component',()=>{
    render(<Router><ButtonAppBar/></Router>)
    const navBarElement = screen.getByTestId('navbar-1')
    expect(navBarElement).toBeInTheDocument()
})
