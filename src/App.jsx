import React, { useContext } from "react";
import PropTypes from "prop-types";
import Counter from "./pages/Counter";
import Header from "./components/Header";
import UserList from "./pages/UserList";
import SimLogin from "./pages/SimLogin";
import { Route, Routes } from "react-router-dom";
import Role from "./pages/Roles";
import Register from "./pages/Register2";
import Page404 from "./pages/Page404";
import Post from "./pages/Post";
import User from "./pages/User";
import classNames from "classnames";
import { Context } from "./context";

function App() {
  const { context } = useContext(Context);
  return (
    <div
      className={classNames("min-vh-100 bg-" + context.theme, {
        "text-light": context.theme === "dark",
      })}
    >
      <Header />
      <div className="p-3">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/roles" element={<Role />} />
          <Route path="/login" element={<SimLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.string,
};

export default App;
