import React from 'react'
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

function Toolbar ({toggleMenu}) {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle toggleMenu={toggleMenu} />
      <Logo height="80%" />
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header> 
  )
}

export default Toolbar
