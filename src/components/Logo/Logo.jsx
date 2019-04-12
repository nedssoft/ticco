import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/Politico.png';
import classes from './Logo.css';

const Logo = ( props ) => {
  const { height } = props;
  return (
    
    <div className={classes.Logo} style={{height}}>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link> 
    </div>
    
  )
}

export default Logo
