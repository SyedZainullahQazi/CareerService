import React from 'react'
import ButtonCss from '../../styles/shared/Button.module.css';

function Button() {
  return (
    <button className={`${ButtonCss.btn_background}`}>Read More</button>
  )
}

export default Button