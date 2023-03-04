import React from "react";
import "../styles/ScoreBoard.css";

export const ScoreBoard = ({ scores, lastWinner }) => {
  const { scoreX, scoreO } = scores;
  
  return (
    <div className="score-board">
      <span className={'score x-score ' + (lastWinner !== 'X' ? 'loser' : '')}>X - {scoreX}</span>
      <span className={'score o-score ' + (lastWinner !== 'O' ? 'loser': '')}>O - {scoreO}</span>
    </div>
  );
};
