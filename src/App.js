import { Board } from "./components/Board";
import { useState } from "react";
import "./App.css";
import { ScoreBoard } from "./components/ScoreBoard";

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ scoreX: 0, scoreO: 0 });

  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const setValue = (index) => {
    if (board[index] === "" && !winner) {
      const updateBoardX = board.map((b, i) => {
        if (i === index) {
          return "X";
        } else {
          return b;
        }
      });
      
      const updateBoardO = setORandom(updateBoardX);
      const winner = checkWinner(updateBoardO);
      
      if (winner) {
        setWinner(winner);
        incrementCountWinner(winner);
      }
      setBoard(updateBoardO);
    }
  };

  const setORandom = (updateBoard) => {
    if(checkWinner(updateBoard) || updateBoard.every((b) => b !== '')) {  //se fija si habra ganador o si se llenara el board
      return updateBoard;
    }
    let copyBoard = [...updateBoard];
    const positions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let casilla = 9; // casilla no existe en el board

    for (let i = 0; i < positions.length; i++) {   //intentar ganar
      copyBoard = [...updateBoard];
      if (copyBoard[i] === "") {
        copyBoard[i] = "O";
        if (checkVictory(copyBoard)) {
          casilla = i;
        }
      }
    }

    copyBoard = [...updateBoard];

    if (casilla === 9) {
      for (let j = 0; j < positions.length; j++) { // fijar bloqueo
        copyBoard = [...updateBoard];
        if (copyBoard[j] === "") {
          copyBoard[j] = "X";
          if (checkVictory(copyBoard)) {
            casilla = j;
          }
        }
      }
    }

    if (casilla === 9) {
      // si no encuentra bloquear a X, ni posiblemente ganar aplica un aleatorio
      casilla = Math.floor(Math.random() * 9);
      while (updateBoard[casilla] !== "") {
        casilla = Math.floor(Math.random() * 9);
      }
    }

    const updateBoardTwo = updateBoard.map((b, i) => {
      if (i === casilla) {
        return "O";
      } else {
        return b;
      }
    });
    return updateBoardTwo;
  };

  const checkVictory = (copyBoard) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];
      if (copyBoard[x] && copyBoard[x] === copyBoard[y] && copyBoard[y] === copyBoard[z]) {
        return true;
      }
    }
    return false;
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }
  };

  const incrementCountWinner = (winner) => {
    if (winner === "X") {
      setScores({ ...scores, scoreX: scores.scoreX + 1 });
    } else {
      setScores({ ...scores, scoreO: scores.scoreO + 1 });
    }
  };

  const checkEndGame = () => {
    return winner || board.every((b) => b !== "");
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setWinner(null);
  };

  return (
    <>
      <ScoreBoard scores={scores} lastWinner={winner}/>
      <Board board={board} onClick={setValue} />
      {checkEndGame() && (
        <div className="end-game">
          {winner === "X" || winner === "O" ? (
            <h3>El ganador es: {winner}</h3>
          ) : (
            <h3>Es un empate</h3>
          )}
          <button className="reset-button" onClick={() => resetGame()}>
            Reiniciar
          </button>
        </div>
      )}
    </>
  );
}

export default App;
