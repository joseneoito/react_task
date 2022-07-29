import {render, cleanup, screen } from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom';
import SelectComponent from '../../Select'
test('should render select component',()=>{
    render(<SelectComponent id="sortBy" name="test" value="sortBy" label="sort by" options={[{key: "age", value:"age"},{key: "createdAt", value: "created at"}]}/>)
    const  selectElement = screen.getByTestId('select')
    expect(selectElement).toBeInTheDocument()
})
