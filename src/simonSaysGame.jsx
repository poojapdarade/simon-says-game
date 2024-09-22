import { useEffect, useState } from "react";
import "./simonSaysGame.css";

function randomColor() {
  const randomIndex = Math.floor(Math.random() * 4);
  const colors = ["red", "blue", "yellow", "green"];
  return colors[randomIndex];
}

const ANIMATION_LENGTH_MS = 1_000;

export function SimonSaysGame() {
  const [gameColors, setGameColors] = useState([]);
  const [animationColors, setAnimationColors] = useState([]);
  const [userColors, setUserColors] = useState([]);
  const [currentGameState, setCurrentGameState] = useState("not-started");
  const [animatedColor, setAnimatedColor] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (animationColors.length === 0) {
      setAnimatedColor("");
      return;
    }

    const copyAnimationColors = [...animationColors];
    const animationColor = copyAnimationColors.pop();

    setAnimatedColor(animationColor);

    setTimeout(() => {
      setAnimationColors(copyAnimationColors);
    }, ANIMATION_LENGTH_MS);
  }, [animationColors]);

  function startGame() {
    if (currentGameState !== "not-started") return;
    setCurrentGameState("playing");
    addGameColor();
  }

  function addGameColor() {
    const newColor = randomColor();
    const newGameColors = [...gameColors, newColor];
    const newGameColorsReversed = [...newGameColors].reverse();
    setGameColors(newGameColors);
    setAnimationColors(newGameColorsReversed);
  }

  function   handleClick(color) {
    if (currentGameState !== "playing") {
      return;
    }
    const currentIndex = userColors.length;
    const newUserColors = [...userColors, color];
    setUserColors(newUserColors);

    const expectedGameColor = gameColors[currentIndex];

    if (color !== expectedGameColor) {
      setIsGameOver(true);
      setCurrentGameState("game-over");
      return;
    }

    if (newUserColors.length === gameColors.length) {
      setUserColors([]);
      addGameColor();
    }
  }

  function resetGame() {
    setGameColors([]);
    setUserColors([]);
    setCurrentGameState("not-started");
    setIsGameOver(false);
  }

  return (
    <div>
      <div className="score">Score: {Math.max(gameColors.length - 1, 0)}</div>
      <div className="square-container">
        <div
          className={`quadrant red ${animatedColor === "red" ? "glow" : ""}`}
          onClick={() => handleClick("red")}
        ></div>
        <div
          className={`quadrant green ${
            animatedColor === "green" ? "glow" : ""
          }`}
          onClick={() => handleClick("green")}
        ></div>
        <div
          className={`quadrant blue ${animatedColor === "blue" ? "glow" : ""}`}
          onClick={() => handleClick("blue")}
        ></div>
        <div
          className={`quadrant yellow ${
            animatedColor === "yellow" ? "glow" : ""
          }`}
          onClick={() => handleClick("yellow")}
        ></div>
        <div className="controls">
          <button onClick={startGame}>Start Game</button>
        </div>

        {isGameOver && (
          <div className="game-over-message">
            <h2>Game Over!</h2>
            <p>Your score: {Math.max(gameColors.length - 1, 0)}</p>
            <button onClick={resetGame}>Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
}
