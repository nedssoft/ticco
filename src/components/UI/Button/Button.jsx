import React from 'react'
import classes from './Button.css'

const Button = ({ clicked, children, btnType, disabled}) => {
  return (
    <button 
      onClick={clicked}
      disabled={disabled}
      className={[classes.Button, classes[btnType]].join(' ')}
    >
      { children }
    </button>
      
  )
}

export default Button
