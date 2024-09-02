import { useState } from "react";
import "./simonSaysGame.css";

function randomColor() {
  const randomIndex = Math.floor(Math.random() * 4);
  const colors = ["red", "blue", "yellow", "green"];
  return colors[randomIndex];
}

export function SimonSaysGame() {
  const [gameColors, setGameColors] = useState([]);
  const [userColors, setUserColors] = useState([]);
  const [currentGameState, setCurrentGameState] = useState("not-started");

  function startGame() {
    if (currentGameState !== "not-started") return;
    setCurrentGameState("playing");
    addGameColor();
  }

  function addGameColor() {
    const newColor = randomColor();
    const newGameColors = [...gameColors, newColor];
    setGameColors(newGameColors);
  }

  function handleClick(color) {
    if (currentGameState !== "playing") {
      return;
    }
    const currentIndex = userColors.length;
    const newUserColors = [...userColors, color];
    setUserColors(newUserColors);

    const expectedGameColor = gameColors[currentIndex];

    if (color !== expectedGameColor) {
      setCurrentGameState("game-over");
      return;
    }

    if (newUserColors.length === gameColors.length) {
      setUserColors([]);
      const newRandomColor = randomColor();
      const updatedGameColors = [...gameColors, newRandomColor];
      setGameColors(updatedGameColors);
    }
  }

  function resetGame() {
    setGameColors([]);
    setUserColors([]);
    setCurrentGameState("not-started");
  }

  return (
    <div>
      <button onClick={() => handleClick("red")}>RED</button>
      <button onClick={() => handleClick("green")}>GREEN</button>
      <button onClick={() => handleClick("blue")}>BLUE</button>
      <button onClick={() => handleClick("yellow")}>YELLOW</button>
      <button onClick={startGame}>Start Game</button>
      <button onClick={resetGame}>Reset Game</button>

      <p>Game Colors</p>
      <pre>{JSON.stringify(gameColors, null, 2)}</pre>

      <p>User Colors</p>
      <pre>{JSON.stringify(userColors, null, 2)}</pre>
    </div>
  );
}

// user clicks start game
// one color should be added to gameColors
// then we need to see user click that color, if they click wrong color game over, if they click the correct color then add a point, go to next round, add a new game color
// we then need to see user click the colors in the correct order
