import {render, cleanup, screen } from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom';
import ButtonComponent from '../../Button'
test('should render Button component',()=>{
    render(<ButtonComponent/>)
    const buttonElement = screen.getByTestId('button')
    expect(buttonElement).toBeInTheDocument()
})
