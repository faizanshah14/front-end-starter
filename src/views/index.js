import React, { useState, useEffect,Fragment } from 'react'
import { Button, Nav, Collapse, Navbar, Container } from 'react-bootstrap'
import Card from '../../src/components/Card'
import Logo from '../components/partials/components/logo'
import { Link } from 'react-router-dom'

//prism
import '../../node_modules/prismjs/prism';
import '../../node_modules/prismjs/themes/prism-okaidia.css'

import SignIn from './dashboard/auth/sign-in'
import Dashboard from './dashboard/index'

// SliderTab
import SliderTab from '../plugins/slider-tabs'

// Import selectors & action from setting store
import * as SettingSelector from "../store/setting/selectors";

// Redux Selector / Action
import { useSelector } from "react-redux";



const Index = () => {
  const appName = useSelector(SettingSelector.app_name);
    useEffect(() => {
      return () => {
        setTimeout(() => {
          Array.from(
            document.querySelectorAll('[data-toggle="slider-tab"]'),
            (elem) => {
              return new SliderTab(elem);
            }
          );
        }, 100);
      };
    });

    return (
        <Fragment>
          <SignIn/>
        </Fragment>
    )
}

export default Index;
