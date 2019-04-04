import React from 'react'
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/orders">Sign In</NavigationItem> 
      <NavigationItem link="/auth">Sign Up</NavigationItem>
      <NavigationItem link="/logout">Logout</NavigationItem>
    </ul>
  )
}

export default NavigationItems
