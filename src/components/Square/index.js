import React from 'react';

function Square(props) {
  return (
    <button 
      className={[
        "square", 
        props.isHighlighted ? "highlighted-btn" : ""
      ].join(' ')} 
      onClick={props.onClick}
      > 
      { props.value } 
    </button>
  )
}

export default Square;