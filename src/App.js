import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import SearchScreen from "./components/search-screen";
import DetailsScreen from "./components/details/details-screen";
import {BrowserRouter, Route} from "react-router-dom";
import HomeScreen from "./components/home-screen";
import {combineReducers, createStore} from "redux";
import commentReducer from "./reducer/comment-reducer";
import userReducer from "./reducer/user-reducer";
import {Provider} from "react-redux";
import React from "react";
import Header from "./components/header";
import Profile from "./components/profile";

const reducer = combineReducers({
    commentReducer: commentReducer,
    userReducer: userReducer
})

const store = createStore(reducer)


function App() {
  return (
      <Provider store={store}>
          <div className="container-fluid">
            <BrowserRouter>
              <Route
                  path="/">
                  <Header/>
              </Route>
              <Route
                  path="/"
                  exact={true}>
                <HomeScreen/>
              </Route>
              <Route
                  path={["/search", "/search/:title"]}
                  exact={true}>
                <SearchScreen/>
              </Route>
              <Route
                  path="/details/:imdbID"
                  exact={true}>
                <DetailsScreen/>
              </Route>
                <Route
                    path="/profile"
                    exact={true}>
                    <Profile/>
                </Route>
            </BrowserRouter>
          </div>
      </Provider>
  );
}

export default App;
