import React, { useState } from 'react';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(null);

  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setIsHovered(true);
    setCurrentIndex(index)
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentIndex(null)
  };

  const handleSquareClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      if (newBoard.find(el => el === null) === undefined) setDraw(true)
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
    setDraw(false)
  };

  const renderSquare = (index) => {
    return (
      <button
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        className={board[index] === null ? `square placeholder ${index === 4 ? 'blink' : null}` : `square ${board[index]}`} onClick={() => handleSquareClick(index)}>
        <p>{board[index] || ((isHovered && index === currentIndex) && currentPlayer)}</p>
      </button>
    );
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    if (draw) status = `Draw`;
    else status = `Next player: ${currentPlayer}`;
  }

  return (
    <div className="App">
      {/* <div className="status">{status}</div> */}
      <div className="board">
        {board.map((_, index) => (
          <div key={index} className="square-container">
            {renderSquare(index)}
          </div>
        ))}
      </div>

      {draw && <div className='draw'>
        <h1>Draw</h1>
        <button className="reset-button" onClick={resetGame}>
          Reset
        </button>
      </div>}

      {winner && <div className='draw'>
        <h1>{winner} winner</h1>
        <button className="reset-button" onClick={resetGame}>
          Reset
        </button>
      </div>}
      <p className='copyright'>©William 2023 | Designed and Created by William</p>
    </div>
  );
};

export default App;
