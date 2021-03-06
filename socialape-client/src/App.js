import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AuthRoute from "./components/common/AuthRoute";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import User from "./pages/user";
import { getUserData, logoutUser } from "./redux/actions/userAction";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import themeFile from "./utils/themeFile";

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        window.location.href = "/login";
        store.dispatch(logoutUser());
    } else {
        store.dispatch({
            type: SET_AUTHENTICATED,
        });
        axios.defaults.headers.common["Authorization"] = token;
        store.dispatch(getUserData());
    }
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <div className="App">
                    <Router>
                        <Navbar />
                        <div className="container">
                            <Switch>
                                <Route path="/" component={Home} exact />
                                <AuthRoute path="/login" component={Login} />
                                <AuthRoute path="/signup" component={Signup} />
                                <Route
                                    exact
                                    path="/user/:handle"
                                    component={User}
                                />
                                <Route
                                    exact
                                    path="/user/:handle/scream/:screamId"
                                    component={User}
                                />
                            </Switch>
                        </div>
                    </Router>
                </div>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
