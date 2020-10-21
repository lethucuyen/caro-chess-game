import React from 'react'

export const calulateWinner = (squares) => {
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

export const getLocation = (index) => {
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
