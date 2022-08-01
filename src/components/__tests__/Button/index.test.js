import {render, cleanup, screen } from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom';
import ButtonComponent from '../../Button'

describe('tests for button', ()=>{
test('should render Button component',()=>{
    render(<ButtonComponent/>)
    const buttonElement = screen.getByTestId('button')
    expect(buttonElement).toBeInTheDocument()
})


it("snapshot button component", () => {
    const mockText = "save";
    const { asFragment } = render(<ButtonComponent text={mockText}/>);
    expect(asFragment(<ButtonComponent text={mockText} />)).toMatchSnapshot();
  });

  it("should render button component with the right text", () => {
    const mockText = "This is just for the sake of the test";
    const { getByText } = render(<ButtonComponent text={mockText} />);
    expect(getByText(mockText)).not.toBeNull();
  });

  it("alternative way using toBeInTheDocument jest-dom uitility library", () => {
    const mockText = "This is just for the sake of the test";
    const { getByText } = render(<ButtonComponent text={mockText} />);
    expect(getByText(mockText)).toBeInTheDocument();
  });

})
