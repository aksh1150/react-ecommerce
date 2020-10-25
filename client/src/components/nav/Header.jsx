import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

import firebase from "firebase";

import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    history.push("/login");
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <SubMenu
        key="SubMenu"
        icon={<SettingOutlined />}
        title="User"
        className="float-right"
      >
        <Item key="setting:1">Option 1</Item>
        <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </Item>
      </SubMenu>
      <Item key="register" icon={<UserAddOutlined />} className="float-right">
        <Link to="/register">Register</Link>
      </Item>
      <Item key="login" icon={<UserOutlined />} className="float-right">
        <Link to="/login">Login</Link>
      </Item>
    </Menu>
  );
};

export default Header;
