import * as React from "react";
import { render as rtlRender,RenderResult, screen, act, waitFor,within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, Routes, BrowserRouter as Router, Route, useLocation } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import rootReducer from '../../../store/reducers';
import App from "../../../App";
import { MemoryRouter } from "react-router-dom";
import user from '@testing-library/user-event';
const UserDetails = React.lazy(() => import("../../UserDetails"));
const store = createStore(rootReducer, applyMiddleware(thunk));
const ButtonAppBar =React.lazy(()=> import("../../../components/Navbar"))
let wrapper;
const renderComponent = ()=>{
    return(
    rtlRender(

            <MemoryRouter initialEntries={['/user/2']}>
    <Provider store={store}>
            <Routes><Route
              path="/user/:id"
             element={<UserDetails />}
            /></Routes>
    </Provider></MemoryRouter>,{route: "/user/2"}
    ))
}
test("/users", async () => {
    renderComponent();
    const userScreen = await waitFor(() => screen.findByTestId("userDetails"), { timeout: 1500 });
    expect(userScreen).toBeInTheDocument();
});
describe('user details', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
    renderComponent();
  });

  it('onSubmit is called when all fields pass validation', async () => {
    user.type(getName(), 'Bruno');
    selectPublic('isPublic');
    user.type(getAge(), 23);
    user.type(getStatusMessage(), 'status test');

    clickSubmitButton();

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        age: 23,
        name: 'Bruno',
        statusMessage: 'status test',
      });
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('has 3 required fields', async () => {
    clickSubmitButton()
    await waitFor(() => {
      expect(getName()).toHaveErrorMessage('Required');
    });

    expect(getAge()).toHaveErrorMessage('Required');
    expect(getStatusMessage()).toHaveErrorMessage(
      'Required'
    );
  });

  describe('name field', () => {
    it('shows error when name is empty space', async () => {
      user.type(getName(), '   ');
      user.tab();

      await waitFor(() => {
        expect(getName()).toHaveErrorMessage(
          'Required'
        );
      });
    });

    it('shows error when empty', async () => {
      user.type(getName(), '');
      user.tab();

      await waitFor(() => {
        expect(getName()).toHaveErrorMessage(
          'Required'
        );
      });
    });
  });

  describe('statusMessage', () => {
    it('shows error when status is empty space', async () => {
      user.type(getStatusMessage(), '   ');
      user.tab();

      await waitFor(() => {
        expect(getStatusMessage()).toHaveErrorMessage(
          'Required'
        );
      });
    });

    it('shows error when empty', async () => {
      user.type(getStatusMessage(), '');
      user.tab();

      await waitFor(() => {
        expect(getStatusMessage()).toHaveErrorMessage(
          'Required'
        );
      });
    });
  });

  describe('age field', () => {

    it('shows error when age is empty', async () => {
      user.type(getAge(), '   ');
      user.tab();

      await waitFor(() => {
        expect(getAge()).toHaveErrorMessage(
          'Required'
        );
      });
    });

    it('shows error when < 0', async () => {
      user.type(getAge(), -12);
      user.tab();

      await waitFor(() => {
        expect(getAge()).toHaveErrorMessage(
          'Required'
        );
      });
    });
  });

});

function clickSubmitButton() {
  user.click(screen.getByRole('button', { name: /save/i }));
}
function getStatusMessage() {
  return screen.getByRole('textbox', { name: /statusMessage/i });
}

function getName() {
  return screen.getByRole('textbox', { name: /name/i });
}

function getAge() {
  return screen.getByRole('textbox', { name: /age/i });
}

function getPublic() {
  return screen.getByRole('combobox', { name: /isPublic/i });
}

function selectPublic(data) {
  const dropdown = getPublic();
  user.selectOptions(
    dropdown,
    within(dropdown).getByRole('option', { name: getPublic })
  );
}

