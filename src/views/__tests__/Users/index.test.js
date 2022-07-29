import * as React from "react";
import { render as rtlRender,RenderResult, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, Routes, BrowserRouter as Router, Switch, useLocation } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import rootReducer from '../../../store/reducers';
import App from "../../../App";
const Users = React.lazy(() => import("../../Users"));
const UserDetails = React.lazy(() => import("../../UserDetails"));
const store = createStore(rootReducer, applyMiddleware(thunk));
const ButtonAppBar =React.lazy(()=> import("../../../components/Navbar"))
let wrapper;
const renderComponent = ()=>{
    return(
    rtlRender(
    <Provider store={store}>
        <Router>
            <ButtonAppBar/>
            <Users/>
        </Router>
    </Provider>,{route: "/users"}
    ))
}
test("/users", async () => {
    renderComponent();
    const userScreen = await waitFor(() => screen.findByTestId("users"), { timeout: 1500 });
    expect(userScreen).toBeInTheDocument();
});

