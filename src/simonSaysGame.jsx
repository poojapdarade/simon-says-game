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
  const [score, setScore] = useState(0);

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
    setScore(0);
  }

  function addGameColor() {
    const newColor = randomColor();
    const newGameColors = [...gameColors, newColor];
    const newGameColorsReversed = [...newGameColors].reverse();
    setGameColors(newGameColors);
    setAnimationColors(newGameColorsReversed);
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
      addGameColor();
      setScore(score + 1);
    }
  }

  function resetGame() {
    setGameColors([]);
    setUserColors([]);
    setCurrentGameState("not-started");
    setScore(0);
  }

  return (
    <div>
      {/* <button
        onClick={() => handleClick("red")}
        style={{
          backgroundColor: animatedColor === "red" ? "red" : "gray",
        }}
      >
        RED
      </button>
      <button onClick={() => handleClick("green")}>GREEN</button>
      <button onClick={() => handleClick("blue")}>BLUE</button>
      <button onClick={() => handleClick("yellow")}>YELLOW</button>
      <button onClick={startGame}>Start Game</button>
      <button onClick={resetGame}>Reset Game</button> */}

      <div className="square-container">
        <div
          className={`quadrant red ${animatedColor === "red" ? "glow" : ""}`} // Add glow if animatedColor is red
          onClick={() => handleClick("red")}
        ></div>
        <div
          className={`quadrant green ${
            animatedColor === "green" ? "glow" : ""
          }`} // Add glow if animatedColor is green
          onClick={() => handleClick("green")}
        ></div>
        <div
          className={`quadrant blue ${animatedColor === "blue" ? "glow" : ""}`} // Add glow if animatedColor is blue
          onClick={() => handleClick("blue")}
        ></div>
        <div
          className={`quadrant yellow ${
            animatedColor === "yellow" ? "glow" : ""
          }`} // Add glow if animatedColor is yellow
          onClick={() => handleClick("yellow")}
        ></div>

        {/* Start and Reset buttons */}
        <div className="controls">
          <button onClick={startGame}>Start Game</button>
          <button onClick={resetGame}>Reset Game</button>
        </div>
      </div>

      <p>Game Colors</p>
      <pre>{JSON.stringify(gameColors, null, 2)}</pre>

      <p>Animation colors</p>
      <pre>{JSON.stringify(animationColors, null, 2)}</pre>

      <p>Animation Color</p>
      <p>{animatedColor}</p>

      <p>User Colors</p>
      <pre>{JSON.stringify(userColors, null, 2)}</pre>
    </div>
  );
}

// user clicks start game
// one color should be added to gameColors
// then we need to see user click that color, if they click wrong color game over, if they click the correct color then add a point, go to next round, add a new game color
// we then need to see user click the colors in the correct order
