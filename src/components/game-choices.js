import React from "react";
import "./game-choices.css";

export default function GameChoices(props) {
  return (
    <header>
      <div>
        <div className="left">Can you guess my number?</div>
        <a href="#" className="button" role="button" id="new-game" onClick={props.newGame}>
          New Game
        </a>
      </div>
    </header>
  );
}
