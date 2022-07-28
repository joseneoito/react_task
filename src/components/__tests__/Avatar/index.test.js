import {render, cleanup, screen} from '@testing-library/react'
import AvatarComponent from '../../Avatar'

test('should render avatar component', ()=>{
    render(<AvatarComponent/>)
    const avatarElement = screen.getByTestId('avatar')
    expect(avatarElement).toBeInTheDocument()
})
