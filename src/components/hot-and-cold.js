import React from "react";
import GameChoices from "./game-choices";
import GameForm from "./game-form";

export default class HotAndCold extends React.Component {
  constructor(props) {
    super(props);
    this.processGuess = this.processGuess.bind(this);
    this.newGame = this.newGame.bind(this);

    let rand = Math.floor(Math.random() * 100);
    console.log(rand);

    this.state = {
      correctNumber: rand,
      newGuess: null,
      oldGuesses: [],
      feedback: "",
      won: false
    };
  }

  checkValidNumber(userGuess) {
    let feedback;
    // Check that userGuess contains only numbers. (If not numeric, .match will return null.
    // Works better than checking result of parseInt for NaN because trailing non-numeric
    // characters are simply ignored in parseInt.)
    if (userGuess.match(/^\d+$/) === null) {
      feedback = `'${userGuess}' is not a number. Please try again.`;
    }

    if (userGuess < 1) {
      feedback = `'${userGuess}' is less than 1. Pick from 1 to 100.`;
    }

    if (userGuess > 100) {
      feedback = `'${userGuess}' is greater than 100.  Pick from 1 to 100.`;
    }

    if (feedback) {
      this.setState({
        feedback: feedback
      });
      return false;
    }

    return true;
  }

  processGuess(e) {
    e.preventDefault();

    let userGuessTxt = e.target.elements.guess.value;
    let validNumber = this.checkValidNumber(userGuessTxt);
    // Reset input on form
    e.target.elements.guess.value = "";

    if (!validNumber) {
      return;
    }

    let userGuessNbr = parseInt(userGuessTxt);
    let feedback;

    let won = false;

    if (userGuessNbr === this.state.correctNumber) {
      feedback = "You Won!";
      won = true;
    } else if (Math.abs(userGuessNbr - this.state.correctNumber) < 6) {
      feedback = "HOT";
    } else {
      feedback = "Cold";
    }

    let prevGuesses = [];
    // or use slice
    prevGuesses = this.state.oldGuesses.map(guess => {
      return guess;
    });

    prevGuesses.push(userGuessNbr);
    this.setState({
      newGuess: e.target.elements.guess.value,
      oldGuesses: prevGuesses,
      feedback: feedback,
      won: won
    });
    console.log(this.state.newGuess);
    console.log(this.state.oldGuesses);
    e.target.elements.feedback = feedback;
  }

  newGame() {
    let rand = Math.ceil(Math.random() * 100);
    console.log(rand);
    this.setState({
      feedback: "",
      oldGuesses: [],
      correctNumber: rand,
      won: false
    });
  }

  render() {
    // const prevGuessHtml = this.state.oldGuesses.join(", ");
    return (
      <div className="hot-and-cold">
        <GameChoices newGame={this.newGame} />
        <GameForm onSubmit={this.processGuess} won={this.state.won} feedback={this.state.feedback} oldGuesses={this.state.oldGuesses.join(", ")} />
        {/* <h2>{this.state.feedback}</h2>
        <p>{prevGuessHtml}</p> */}
      </div>
    );
  }
}
