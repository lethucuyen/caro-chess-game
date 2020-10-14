import React from 'react';
import './App.css'

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

/* ************************ */
class Board extends React.Component { 
  renderSquare(i) {
    // check to highlight the three squares that caused the win
    const filterItems = this.props.highlightedSquares.filter(item => item === i);
    
    return <Square 
      key={i} 
      value={this.props.squares[i]} 
      isHighlighted={filterItems.length ? true : false} 
      onClick={() => this.props.onClick(i)}
    />;
  } 

  render() {
    const numbers = [];
    const n = 3;
    for (let i = 0; i < n; i++) {
      numbers.push(i)
    } 

    return (
      <div>
        {numbers.map((i) => 
          <div key={i} className="board-row">
            {numbers.map((j) => 
              this.renderSquare(i*3 + j)
            )}
          </div>
        )}
      </div>
    )
  }
}

/* ************************ */
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        position: null,
        value: new Date()
      }],
      xIsNext: true,
      stepNumber: 0,
      isAscendingOrder: true,
    };
  }

  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares =  current.squares.slice();

    if (calulateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    
    this.setState({
      history: history.concat([{
        squares: squares, 
        position: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }

  handleChangeSortSwitch = (e) => {
    this.setState({
      isAscendingOrder: !this.state.isAscendingOrder,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const moves = history.map((step, move) => {
      const position = step.position;
      const desc = move 
        ? 'Go to move #' + move + `${position ? ' ~ Location: ' + getLocation(position) : ''}`
        : 'Go to start';
      const isSelectedMove = (move === this.state.stepNumber)

      return (
        <li key={move}>
          <button style={{ fontWeight: isSelectedMove ? 'bold' : 'normal'}} onClick={() => this.jumpTo(move)}> { desc } </button>
        </li>
      )
    })

    let sorted = moves.slice();

    sorted = this.state.isAscendingOrder 
    ? sorted.sort((a, b) => (a.key - b.key))
    : sorted.sort((a, b) => (b.key - a.key))

    let status;
    const winner = calulateWinner(current.squares)

    if (winner) {
      status = `Winner: ${winner.name}`
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            highlightedSquares={winner ? winner.items : []}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div> { status } </div>
          <ol> { sorted } </ol>
          {/* switch */}
          <div>
            <label className="switch">
              <input type="checkbox" checked={!this.state.isAscendingOrder} onChange={this.handleChangeSortSwitch}/>
              <span className="slider round"></span>
            </label>
            <span style={{paddingLeft: '10px'}}>Sort in ascending/descending order</span>
          </div>
        </div>
      </div>
    );
  }
}

/* ************************ */
function App() {
  return (
    <Game></Game>
  );
}

export default App;

/**
 * ===========================
 * ===========================
 * ===========================
 */
function calulateWinner(squares) {
  const lines = [
    [0, 4, 8],
    [2, 4, 6],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return {
        name: squares[a],
        items: [a, b, c]
      };
    }
  }

  // check if there are no one wins
  let isNoOneWins = true;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      isNoOneWins = false;
    }
  }

  if (isNoOneWins) {
    return {
      name: "Opps! There are no one wins.",
      items: []
    };
  }

  return null;
}

function getLocation(index) {
  // x:col - y:row
  const positions = [
    {x: 1,y: 1},
    {x: 2,y: 1},
    {x: 3,y: 1},
    {x: 1,y: 2},
    {x: 2,y: 2},
    {x: 3,y: 2},
    {x: 1,y: 3},
    {x: 2,y: 3},
    {x: 3,y: 3},
  ]

  const location = positions[index]
  return `(${location.x},${location.y})`
}
