import React, { useState } from 'react';
import Board from '../Board/index.js';
import { calulateWinner, getLocation } from './gameService.js';

function Game(props) {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
    position: null,
    value: new Date()
  }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [isAscendingOrder, setIsAscendingOrder] = useState(true);

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const handleClick = (i) => {
    const _history = history.slice(0, stepNumber + 1);
    const current = _history[_history.length - 1];
    const squares = current.squares.slice();

    if (calulateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';

    setHistory(_history.concat([{
      squares: squares,
      position: i,
    }]));
    setStepNumber(_history.length);
    setXIsNext(!xIsNext);
  }

  const handleChangeSortSwitch = (e) => {
    setIsAscendingOrder(!isAscendingOrder);
  }

  const _history = history;
  const current = _history[stepNumber];

  const moves = _history.map((step, move) => {
    const position = step.position;
    const desc = move
      ? 'Go to move #' + move + `${position ? ' ~ Location: ' + getLocation(position) : ''}`
      : 'Go to start';
    const isSelectedMove = (move === stepNumber)

    return (
      <li key={move}>
        <button style={{ fontWeight: isSelectedMove ? 'bold' : 'normal' }} onClick={() => jumpTo(move)}> {desc} </button>
      </li>
    )
  })

  let sorted = moves.slice();

  sorted = isAscendingOrder
    ? sorted.sort((a, b) => (a.key - b.key))
    : sorted.sort((a, b) => (b.key - a.key))

  let status;
  const winner = calulateWinner(current.squares)

  if (winner) {
    status = `Winner: ${winner.name}`
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          highlightedSquares={winner ? winner.items : []}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div> {status} </div>
        <ol> {sorted} </ol>
        {/* switch */}
        <div>
          <label className="switch">
            <input type="checkbox" checked={!isAscendingOrder} onChange={handleChangeSortSwitch} />
            <span className="slider round"></span>
          </label>
          <span style={{ paddingLeft: '10px' }}>Sort in ascending/descending order</span>
        </div>
      </div>
    </div>
  );
}

export default Game;
