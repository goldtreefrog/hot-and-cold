import React from "react";
import "./game-form.css";

export default function GameForm(props) {
  console.log("props: ", props);
  return (
    <form onSubmit={e => props.onSubmit(e)}>
      <h1>HOT or COLD</h1>
      <h2>Guess My Number</h2>
      <p>1 to 100</p>
      <input type="text" id="guess" name="guess" placeholder="Enter guess here" disabled={props.won} required />
      <button id="submit" name="submit" disabled={props.won}>
        Guess
      </button>
      <h3 id="feedback" name="feedback">
        {props.feedback}
      </h3>
      <p id="oldGuesses" name="oldGuesses">
        {props.oldGuesses}
      </p>
    </form>
  );
}
