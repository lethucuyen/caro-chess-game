import React from 'react';
import Square from '../Square/index.js'

function Board (props) { 
  const numbers = [];
  const n = 3;
  for (let i = 0; i < n; i++) {
    numbers.push(i)
  } 

  const renderSquare = (i) => {
    // check to highlight the three squares that caused the win
    const filterItems = props.highlightedSquares.filter(item => item === i);
    
    return <Square 
      key={i} 
      value={props.squares[i]} 
      isHighlighted={filterItems.length ? true : false} 
      onClick={() => props.onClick(i)}
    />;
  } 

  return (
    <div>
      {numbers.map((i) => 
        <div key={i} className="board-row">
          {numbers.map((j) => 
            renderSquare(i*3 + j)
          )}
        </div>
      )}
    </div>
  );
}

export default Board;